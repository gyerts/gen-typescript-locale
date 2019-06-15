export const showFileInformation = (filePath: string, phrases: string[], fileContentDict: {}) => {
   const redundantLines: string[] = [];
   const absentLines: string[] = [];

   const thisFilePhrases = Object.keys(fileContentDict);

   thisFilePhrases.map((key: string) => {
      if (!phrases.includes(key)) {
         redundantLines.push(key);
      }
   });

   phrases.map((key: string) => {
      if (!thisFilePhrases.includes(key)) {
         absentLines.push(key);
      }
   });

   (redundantLines.length || absentLines.length) && console.warn(`\n\n[ISSUES] ${filePath}:`);
   redundantLines.length && console.log('   Redundant lines');
   redundantLines.map(redundantLine => {
      console.log(`    - ${redundantLine}`);
   });

   absentLines.length && console.log('   Absent lines');
   absentLines.map(absentLine => {
      console.log(`    - ${absentLine}`);
   });
};
