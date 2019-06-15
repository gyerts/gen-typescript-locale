import fs from "fs";

const startPointLiteral = '// gen-typescript-locale start point';
const endPointLiteral = '// gen-typescript-locale end point';

export const readDictFromFile = (filePath: string) => {
   const fileContent = fs.readFileSync(filePath);

   const startPoint = fileContent.indexOf(startPointLiteral) + startPointLiteral.length;
   const endPoint = fileContent.indexOf(endPointLiteral);

   let fileContentDict = {};
   eval(`fileContentDict = {${fileContent.slice(startPoint, endPoint)}}`);
   return fileContentDict;
};
