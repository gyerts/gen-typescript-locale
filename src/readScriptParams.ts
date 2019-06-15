function getArgs () {
   const args: any = {};
   process.argv
      .slice(2, process.argv.length)
      .forEach( arg => {
         // long arg
         if (arg.slice(0, 2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2, longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
         }
         // flags
         else if (arg[0] === '-') {
            const flags = arg.slice(1, arg.length).split('');
            flags.forEach(flag => {
               args[flag] = true;
            });
         }
      });
   return args;
}

export const readScriptParams = (generate: (dist: string) => void) => {
   const args = getArgs();
   console.log(args);

   if (args.dist) {
      generate(args.dist);
   } else {
      throw 'You have to specify --dist param where all files will be generated';
   }
};
