import xlsxj from 'xlsx-to-json';

xlsxj({
  input: 'offensecodes.xlsx',
  output: 'offensecodes.json',
  sheet: 'Code Order',
}, (error, result) => {
  if(error) {
    console.error(error);
  } else {

  }
});