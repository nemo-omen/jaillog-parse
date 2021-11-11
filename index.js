import * as fs from 'fs';
import {JSDOM} from 'jsdom';
import { codes } from './codes.js';
import { wpTemplate } from './template.js'; 

const writeStream = fs.createWriteStream('charge-categories.txt');

const pathName = writeStream.path;

const templateFilePath = 'jaillog_wp.txt';

const myDom = await JSDOM.fromFile('./jl.html');

const rawHTML = fs.readFileSync('./jl.html', 'utf8');

const document = myDom.window.document;

const divs = Array.from(document.querySelectorAll('div'));

const myDivs = divs.filter((div) => div.classList.contains('x_data-item'));

const links = Array.from(document.querySelectorAll('a'));

const count = divs.filter((div) => div.classList.contains('x_image-div')).length;

const reserved = ['*RPR*', '*COMM*', 'CS', 'PG', 'MISC', 'CPF', 'FTA', 'VPTA', '*GOB*', 'DL'];

const digitRegex = /\d{8}/;

const digitSpaceRegex = /\d{8}\s/;

const whitespaceRegex = /\s{2,8}/;

links.forEach((link) => {
  link.parentNode.removeChild(link);
});

const vals = myDivs
  .map((div) => div.innerHTML)
  .filter((val) => val !== 'No Bond')
  .filter((val) => val[0] !== '$')
  .filter((val) => val.length !== 6)
  .filter((val) => val.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g) === null)
  .map((val) => val.split('<br aria-hidden="true">'))
  .flat() // <--
  .map((val) => {
    const first = val.split(' ')[0];
    const remaining = val
      .split(' ')
      .slice(1)
      .join(' ');

    if(first.match(digitRegex)) {
      return remaining;
    }
    
    return val;
  })
  .map((val) => {
    return val
      .replace('\n', '')
      .replace(whitespaceRegex, ' ')
      .replace('&gt;', '>')
      .replace('&lt;', '<')
      ;
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
  .map((line) => `${line}`);

const template = wpTemplate(24, count, 'https://conchovalleyhomepage.com/crime/jail-logs/jail-logs-november-11-2021', lines, myDom.serialize());

fs.writeFileSync(templateFilePath, template, 'utf8');

// lines.forEach((line) => writeStream.write(`${line}\n`));

// writeStream.on('finish', () => {
  // console.log(`Finished writing ${pathName}`);
// });
// 
// writeStream.on('error', (error) => {
  // console.error(`Failed to write ${pathName} with error: ${error}`);
// });

// writeStream.end();