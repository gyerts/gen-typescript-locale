"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getArgs() {
    var args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(function (arg) {
        // long arg
        if (arg.slice(0, 2) === '--') {
            var longArg = arg.split('=');
            var longArgFlag = longArg[0].slice(2, longArg[0].length);
            var longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
        // flags
        else if (arg[0] === '-') {
            var flags = arg.slice(1, arg.length).split('');
            flags.forEach(function (flag) {
                args[flag] = true;
            });
        }
    });
    return args;
}
exports.readScriptParams = function (generate) {
    var args = getArgs();
    console.log(args);
    if (args.dist) {
        generate(args.dist);
    }
    else {
        throw 'You have to specify --dist param where all files will be generated';
    }
};
