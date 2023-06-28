(function() {
    const FREE_WARNING = 'Free shipping only applies to single customer orders';
    const BANNED_WARNING = 'Unfortunately, we do not ship to your country of residence';
    const NONE_SELECTED = '0';
  
    let shipping = null;
    let currency = null;
  
    const customers = 1;
    let location = 'RSA';
  
    const shoes = 300 * 1;
    const toys = 100 * 5;
    const shirts = 150 * NONE_SELECTED;
    const batteries = 35 * 2;
    const pens = 5 * NONE_SELECTED;
  
    if (location === 'RSA') {
      currency = 'R';
      shipping = 400;
    } else {
      currency = '$';
      shipping = location === 'NAM' ? 600 : 800;
    }
  
    const totalCost = shoes + toys + shirts + batteries + pens;
    let calcShipping = shipping;
  
    if (totalCost >= 1000 && (location === 'RSA' || location === 'NAM') && customers === 1) {
      calcShipping = 0;
    }
  
    if (calcShipping === 0 && customers !== 1) {
      console.warn(FREE_WARNING);
    } else if (location === 'NK') {
      console.warn(BANNED_WARNING);
    } else {
      console.log('Price:', currency, totalCost + calcShipping);
    }
  })();

  