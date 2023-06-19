document.addEventListener('DOMContentLoaded', function() {
  var num = document.getElementById("Counter_Number").value;
    var incr = document.getElementById("INC");
    var dcr = document.getElementById("DINC");
    
    function Increase() {
      num = parseInt(document.getElementById("Counter_Number").value);
      num= num + 1;
      document.getElementById("Counter_Number").value=num;
    }
  
    function Decease() {
      num = parseInt(document.getElementById("Counter_Number").value);
      num=num-1;
      document.getElementById("Counter_Number").value=num;
    }
  
    incr.addEventListener('click', Increase);
    dcr.addEventListener('click', Decease);
  });
  