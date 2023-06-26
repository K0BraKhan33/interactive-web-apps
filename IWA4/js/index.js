var shoes = 300 * 1;
var toys = 100 * 5;
var shirts = 150 * 0;
var batteries = 35 * 2;
var pens = 5 * 0;
var shipping = null;
var currency = '$';
var location = 'RSA';
var customers = '1';
var calcShipping = shoes + batteries + pens + shirts;

let FREE_WARNING = 'Free shipping only applies to single customer orders';
let BANNED_WARNING = 'Unfortunately we do not ship to your country of residence';
let NONE_SELECTED = '0';

if (location === 'RSA') {
  shipping = 400;
  currency = 'R';
}

if (location === 'NAM') {
  shipping = 600;
} else if (location !== 'RSA' || location !== 'NAM') {
  shipping = 800;
}

calcShipping = shoes + batteries + pens + shirts;

if ((calcShipping > 1000 && customers < 2) && (location === 'NAM' || location === 'RSA')) {
  shipping = 0 + calcShipping;
}

if (shipping === 0 && customers !== 1) {
  console.log('WARNING');
}

if (location === 'NK') {
  console.warn('WARNING');
} else {
  console.log('price', currency, shoes + batteries + pens + shirts + shipping);
}


