import recursive from 'recursive-readdir';
import fs from 'fs';
import {showFileInformation} from "./showFileInformation";
import {readDictFromFile} from "./readDictFromFile";
import {generateTypesFile} from "./generateTypesFile";
import {readScriptParams} from "./readScriptParams";

export const generate = (distPath: string) => {
   const fileContent: string = fs.readFileSync(`${distPath}/phrases.txt`).toString('utf-8');
   const phrases = fileContent.split('\n').filter(line => (line = line.trim()) && !line.startsWith('//'));
   const distTypesFile = `${distPath}/generatedTypes.ts`;

   recursive(`${distPath}/translates`, (err: Error, files: string[]) => {
      files.map((filePath: string) => {
         const fileContentDict = readDictFromFile(filePath);
         showFileInformation(filePath, phrases, fileContentDict);
         generateTypesFile(distTypesFile, phrases);
      });
   });
};

readScriptParams(generate);
