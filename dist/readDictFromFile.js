"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var startPointLiteral = '// gen-typescript-locale start point';
var endPointLiteral = '// gen-typescript-locale end point';
exports.readDictFromFile = function (filePath) {
    var fileContent = fs_1.default.readFileSync(filePath);
    var startPoint = fileContent.indexOf(startPointLiteral) + startPointLiteral.length;
    var endPoint = fileContent.indexOf(endPointLiteral);
    if (startPoint === -1 || endPoint === -1) {
        throw "Cannot find comments '" + startPoint + "' or '" + endPointLiteral + "' in file " + filePath;
    }
    var fileContentDict = {};
    eval("fileContentDict = {" + fileContent.slice(startPoint, endPoint) + "}");
    return fileContentDict;
};
