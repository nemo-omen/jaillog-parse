import * as fs from 'fs';

const rawJson = fs.readFileSync('./offensecodes.json');

export const codes = {};

const codesArray = JSON.parse(rawJson);

codesArray.forEach((code) => {
  codes[code.Code] = code.Offense;
});

// console.log(codes);