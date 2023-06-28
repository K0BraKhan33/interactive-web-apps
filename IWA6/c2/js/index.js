const rent = 400;
const tax = '8%';
const food = 51.7501;
const salary = 800;
const transport = 10.2;
const hourOfDay = 0;
const minuteOfDay = 0;

// Only change below this line

let balance; 
const istime = hourOfDay === 0 && minuteofDay === 0;



if (typeof hourOfDay !== 'undefined' && minuteOfDay !== null && hourOfDay === 0 && minuteOfDay === 0) {
  const taxAsDecimal = parseFloat(tax) / 100;
  const startingAfterTax = salary * (1 - taxAsDecimal);
  balance = startingAfterTax - transport - food - rent; 
}
else {
  balance = NaN; 
}

console.log('R ' + balance.toFixed(2));
