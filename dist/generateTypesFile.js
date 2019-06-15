"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var __ = '\n  ';
exports.generateTypesFile = function (dest, phrases) {
    var content = '';
    content += 'export type IDictionaryType = {';
    phrases.map(function (phrase) {
        phrase = phrase.replace(/'/g, '\\\'');
        content += __ + " '" + phrase + "'";
    });
    content += '};';
    content += '\n\n';
    content += 'export type IPhraseType =';
    phrases.map(function (phrase, index) {
        phrase = phrase.replace(/'/g, '\\\'');
        if (phrases.length - 1 === index) {
            content += __ + " '" + phrase + "';";
        }
        else {
            content += __ + " '" + phrase + "' |";
        }
    });
    content += '\n';
    fs_1.default.writeFile(dest, content, function (err) {
        if (err) {
            return console.error(err);
        }
    });
};
