(function() {
  let shoes = 300 * 1;
  let toys = 100 * 5;
  let shirts = 150 * 0;
  let batteries = 35 * 2;
  let pens = 5 * 0;
  let shipping = null;
  let currency = '$';
  const location = 'RSA';
  const customers = '1';
  let calcShipping = shoes + batteries + pens + shirts;

  let FREE_WARNING = 'Free shipping only applies to single customer orders';
  let BANNED_WARNING = 'Unfortunately we do not ship to your country of residence';
  let NONE_SELECTED = '0';

  if (location === 'RSA') { 
    currency = 'R';
    shipping = 400;
  } else {
    currency = '$';
    shipping = location === 'NAM' ? 600 : 800;
  }
  const totalCost = shoes + toys + shirts + batteries + pens;
  calcShipping = shoes + batteries + pens + shirts;

  if (calcShipping > 1000 && customers < 2) {
    shipping = 0 + calcShipping;
  }

  if (shipping === 0 && customers !== 1) {
    console.warn('WARNING');
  }

  if (location === 'NK') {
    console.warn('WARNING');
  } else {
    console.log('Price:', currency, totalCost + calcShipping);
  }
})();
