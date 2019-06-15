"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showFileInformation = function (filePath, phrases, fileContentDict) {
    var redundantLines = [];
    var absentLines = [];
    var thisFilePhrases = Object.keys(fileContentDict);
    thisFilePhrases.map(function (key) {
        if (!phrases.includes(key)) {
            redundantLines.push(key);
        }
    });
    phrases.map(function (key) {
        if (!thisFilePhrases.includes(key)) {
            absentLines.push(key);
        }
    });
    (redundantLines.length || absentLines.length) && console.warn("\n\n[ISSUES] " + filePath + ":");
    redundantLines.length && console.log('   Redundant lines');
    redundantLines.map(function (redundantLine) {
        console.log("    - " + redundantLine);
    });
    absentLines.length && console.log('   Absent lines');
    absentLines.map(function (absentLine) {
        console.log("    - " + absentLine);
    });
};
