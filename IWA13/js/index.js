let state = 'idle';
let user = null;
let calculated = '1';

// Only allowed to change below

const logCalc = () => {
  const isString = typeof calculated === 'string' && !isNaN(calculated);
  //place pars int on firts calc for proper checker
  const calculatedAsNumber = isString ? parseInt(calculated) : calculated;
  //not toString but String
  calculated = String(calculatedAsNumber + 1);
};

const calcUser = () => {
    //brackets
  logCalc();
  //dubble check
  if (parseInt(calculated) > 2) {
    user = 'John';
    state = 'requesting';
  }
  if (parseInt(calculated) > 3) {
    state = 'idle';
  }
};

const checkUser = () => {
  if (user && state === 'requesting') {
    console.log(`User: ${user} (${calculated})`);}
};

// Only allowed to change code above

checkUser();
calcUser();

checkUser();
calcUser();

checkUser();
calcUser();

checkUser();
calcUser();

checkUser();
calcUser();
