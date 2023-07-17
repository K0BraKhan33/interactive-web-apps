const firstName = 'John';
const age = 35;
const hobby = 'Coding';

const logTwice = (parameter) => {
  console.log(parameter);
  console.log(parameter);
}

function printMessage(name, age, hobby) {
  logTwice(`Hello, ${name} (${age}). I love ${hobby}!`);
}

printMessage(firstName, age, hobby);
