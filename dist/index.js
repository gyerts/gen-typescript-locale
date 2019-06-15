"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var recursive_readdir_1 = __importDefault(require("recursive-readdir"));
var fs_1 = __importDefault(require("fs"));
var showFileInformation_1 = require("./showFileInformation");
var readDictFromFile_1 = require("./readDictFromFile");
var generateTypesFile_1 = require("./generateTypesFile");
var fileContent = fs_1.default.readFileSync('/home/gyerts/PycharmProjects/holy.architect/client/src/locale/phrases.txt').toString('utf-8');
var phrases = fileContent.split('\n').filter(function (line) { return (line = line.trim()) && !line.startsWith('//'); });
var distTypesFile = '/home/gyerts/PycharmProjects/holy.architect/client/src/locale/generatedTypes.ts';
recursive_readdir_1.default('/home/gyerts/PycharmProjects/holy.architect/client/src/locale/translates', function (err, files) {
    files.map(function (filePath) {
        var fileContentDict = readDictFromFile_1.readDictFromFile(filePath);
        showFileInformation_1.showFileInformation(filePath, phrases, fileContentDict);
        generateTypesFile_1.generateTypesFile(distTypesFile, phrases);
    });
});
