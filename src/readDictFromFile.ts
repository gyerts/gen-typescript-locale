import fs from "fs";

const startPointLiteral = '// gen-typescript-locale start point';
const endPointLiteral = '// gen-typescript-locale end point';

export const readDictFromFile = (filePath: string) => {
   const fileContent = fs.readFileSync(filePath);

   const startPoint = fileContent.indexOf(startPointLiteral) + startPointLiteral.length;
   const endPoint = fileContent.indexOf(endPointLiteral);

   if (startPoint === -1 || endPoint === -1) {
      throw `Cannot find comments '${startPoint}' or '${endPointLiteral}' in file ${filePath}`;
   }

   let fileContentDict = {};
   eval(`fileContentDict = {${fileContent.slice(startPoint, endPoint)}}`);
   return fileContentDict;
};
