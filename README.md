## What is it?
This is a little library for the translation of your phrases
This library is the fastest one in whole libraries I have seen

## Required file structure

Required structure of `locale` folder, this folder may located anywhere you want

    src
        locale
            translates
                english.ts                // here phrases translation should be located
                ... (other languages)
            generatedTypes.ts             // this file will be generated
            index.ts                      // this is a library file
            phrases.txt                   // here application phrases will be located

## Quick start
    npm install --save-dev gen-typescript-locale

#### 1) add next code to the file: `./src/locale/index.ts`
```typescript
import {IPhraseType} from './generatedTypes';
const language = localStorage.getItem('language');

let dict = {};

if (language) {
   dict = require(`./translates/${language}`).dict;
} else {
   dict = require('./translates/english').dict;
}

export const _ = (phrase: IPhraseType, replacers: Object = {}): string => {
   let foundPhrase: string = dict[phrase];

   Object.keys(replacers).forEach(key => {
      foundPhrase = foundPhrase.replace(new RegExp(`{${key}}`, 'g'), replacers[key]);
   });

   return foundPhrase;
};
```
This is a library file, here defined logic how to manage phrases from the language file. 
If you need custom logic you can change it of course

#### 2) add next content to the file: `./src/locale/phrases.txt`
```
// common
January

// this is some unique page
Hello {name}
```
The only place where you want to define phrases which your application will using.
As you can see the syntax is quite simple:
* `// ` - comment
* `January` - phrase in you app, by this phrase will be generated TS code to make your life easy
* `Hello {name}` - phrase in you app with variable, 
                    in TS code you can pass the value in this way: `_('Hello {name}', {name: 'Your name'})`

#### 3) add translation of `./src/locale/translates/english.ts`
```typescript
import {IDictionaryType} from '../generatedTypes';

export const dict: IDictionaryType = {
   // gen-typescript-locale start point
   'January': 'January',
   'Hello {name}': 'Hello {name}'
   // gen-typescript-locale end point
};
```
ignore that `IDictionaryType` not found, it will be generated after next command.

Comments `// gen-typescript-locale start/end point` are required!

#### 4) add script for code generation to the `./package.json`
```json
{
   "scripts": {
      "gen_locale": "node ./node_modules/gen-typescript-locale --dist='./src/locale'"
   }
}
```
Parameter `--dist` should points to the folder `locale` with all files written in prev steps

#### 5) generate code
```bash
npm run gen_locale
```

#### 6) Add usage somewhere in your application
```typescript
import {_} from './src/locale'

_('January'); // returns 'January'
_('Hello {name}', {name: 'Yuriy'}); // returns 'Hello Yuriy'
```
