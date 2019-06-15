import fs from "fs";

const __ = '\n  ';

export const generateTypesFile = (dest: string, phrases: Array<string>) => {
   let content = '';

   content += 'export type IDictionaryType = {';
   phrases.map((phrase: string) => {
      phrase = phrase.replace(/'/g, '\\\'');
      content += `${__} '${phrase}'`;
   });
   content += '};';

   content += '\n\n';

   content += 'export type IPhraseType =';
   phrases.map((phrase: string, index: number) => {
      phrase = phrase.replace(/'/g, '\\\'');
      if (phrases.length - 1 === index) {
         content += `${__} '${phrase}';`;
      } else {
         content += `${__} '${phrase}' |`;
      }
   });

   content += '\n';

   fs.writeFile(dest, content, (err) => {
      if (err) {
         return console.error(err);
      }
   });
};
