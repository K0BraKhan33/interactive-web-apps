const salary = 4000;
const lodging = 'apartment'
const size = 'large'


// Only change the syntax below (not the values or key names)

const expenses = {
    food: `51.7501`,
    transport:  `10.2`,
    rent : {
        none: 0,
        small_room: `200`,
        large_room: `300`,
        small_apartment: `400`,
        large_apartment: `800`,
        small_house: `1200`,
        large_house: `2400`,
    }
    
}
  
const tax = {
    val734: '3%',
    val234: '20%',
    val913: '12%',
    val415: '38%',
    val502: '42%',
}


// You can change below however you want

const taxAsDecimal = parseFloat(tax.v913) / 100;
const startingAfterTax = salary * 1 - taxAsDecimal;
const type =  size+"_"+lodging;
const balance = expenses.transport - expenses.food - expenses.rent[type];
console.log(expenses.transport);
console.log(expenses.food);
console.log(expenses.rent[type]);
console.log(balance)