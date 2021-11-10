import * as fs from 'fs';
import {JSDOM} from 'jsdom';
import { codes } from './codes.js';

const writeStream = fs.createWriteStream('charge-categories.md');
const pathName = writeStream.path;

const htmlFile = fs.readFileSync('./jl.html');

const myDom = await JSDOM.fromFile('./jl.html');

const document = myDom.window.document;

const divs = Array.from(document.querySelectorAll('div'));

const myDivs = divs.filter((div) => div.classList.contains('x_data-item'));

const reserved = ['*RPR*', '*COMM*', 'CS', 'PG', 'MISC', 'CPF', 'FTA', 'VPTA', '*GOB*', 'DL'];

const digitRegex = /\d{8}/;

const digitSpaceRegex = /\d{8}\s/;

const whitespaceRegex = /\s{2,8}/;

const vals = myDivs
  .map((div) => div.innerHTML)
  .filter((val) => val !== 'No Bond')
  .filter((val) => val[0] !== '$')
  .filter((val) => val.length !== 6)
  .filter((val) => val.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g) === null)
  .map((val) => val.split('<br aria-hidden="true">'))
  .flat() // <--
  .map((val) => val
          .replace(digitRegex, '')
          .replace('\\n', '')
          .replace(whitespaceRegex, ' ').replace('&gt;', '>')
          .replace('*COMM*', '*COMM* ')
          .replace('*RPR*', '*RPR* ')
          .replace('*MTR*', '*MTR* ')
          .replace('&lt;', '<')
          .replace('  ', ' ')
          .split(' ')
          .map(
            (word) => {
              if(!reserved.includes(word) && word.charAt(0) !== '*') {
                if(word.charAt(0) === 'W' && word.charAt(1) == '/') {
                  return word.charAt(0).toLowerCase() + word.charAt(1) + word.charAt(2) + word.slice(3).toLowerCase();
                }

                return word.charAt(0) + word
                  .slice(1)
                  .toLowerCase();
              } else {
                return word;
              }
            }
          ).join(' '))
          .map((val) => {
            if(val.charAt(0) === ' ') {
              return val.slice(1);
            } else {
              return val;
            }
          });

const charges = new Map();

for(const val of vals) {
  if(!charges.has(val)) {
    charges.set(val, 1);
  } else {
    charges.set(val, charges.get(val) + 1);
  }
}

let lines = [];

const chargeEntries = charges.entries();

for(let [key, value] of chargeEntries) {
  lines.push(`${key}: ${value}`);
}

lines = lines
  .sort((a,b) => a < b ? -1 : a > b ? 1 : 0)
  .map((line) => `- ${line}`);

console.log(lines);

lines.forEach((line) => writeStream.write(`${line}\n`));

writeStream.on('finish', () => {
  console.log(`Finished writing ${pathName}`);
});

writeStream.on('error', (error) => {
  console.error(`Failed to write ${pathName} with error: ${error}`);
});

writeStream.end();