import recursive from 'recursive-readdir';
import fs from 'fs';
import {showFileInformation} from "./showFileInformation";
import {readDictFromFile} from "./readDictFromFile";
import {generateTypesFile} from "./generateTypesFile";


const fileContent: string = fs.readFileSync('/home/gyerts/PycharmProjects/holy.architect/client/src/locale/phrases.txt').toString('utf-8');
const phrases = fileContent.split('\n').filter(line => (line = line.trim()) && !line.startsWith('//'));
const distTypesFile = '/home/gyerts/PycharmProjects/holy.architect/client/src/locale/generatedTypes.ts';


recursive('/home/gyerts/PycharmProjects/holy.architect/client/src/locale/translates', (err: Error, files: string[]) => {
   files.map((filePath: string) => {
      const fileContentDict = readDictFromFile(filePath);
      showFileInformation(filePath, phrases, fileContentDict);
      generateTypesFile(distTypesFile, phrases);
   });
});
