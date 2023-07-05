const leoName = 'Leo';
const leoSurname = 'Musvaire     ';
const leoBalance = '-9394';

const sarahName = 'Sarah    ';
const sarahSurname = 'Kleinhans';
const sarahBalance = '-4582.21000111';

const divider = '----------------------------------';

// Only change below this line

const owed = parseFloat(leoBalance) + parseFloat(sarahBalance);
const leo = `${leoName} ${leoSurname.trim()} (Owed: R ${Math.abs(parseFloat(leoBalance)).toFixed(2)})`;
const sarah = `${sarahName} ${sarahSurname.trim()} (Owed: R ${Math.abs(parseFloat(sarahBalance)).toFixed(2)})`;
const total = `Total amount owed: R ${owed.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
const result = `\n${leo}\n${sarah}\n\n${divider}\n${total}\n${divider}`;

console.log(result);
