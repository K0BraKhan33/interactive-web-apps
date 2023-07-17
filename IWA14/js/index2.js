function add(a, b) {
    return a + b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function internal() {
    const added = add(this.internal.a , this.internal.b);
    const multiplied =  multiply(this.internal.a ,this.internal.b);
    console.log(added);
    console.log(multiplied);
    return this;
  }
  
  // Not allowed to change below this
  
  const example1 = {
    internal: {
      a: 40,
      b: 8,
      c: 0,
    },
    add,
    multiply,
    calculate: internal
  }
  
  const example2 = {
    internal: {
      a: 6,
      b: 2,
      c: 0,
    },
    add,
    multiply,
    calculate: internal
  }
  
  example1.calculate();
  example2.calculate();
  