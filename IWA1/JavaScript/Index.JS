document.addEventListener('DOMContentLoaded', function() {
  const min=-5;
  const max=15;
  var num = document.getElementById("Counter_Number").value;
    var incr = document.getElementById("INC");
    var dcr = document.getElementById("DINC");
    
    function Increase() {
      num = parseInt(document.getElementById("Counter_Number").value);
      if(num>=15){

      document.getElementById("Counter_Number").value=15;
        incr.disabled=true;
        dcr.disabled=false;
      }
      else{
        incr.disabled=false;
        dcr.disabled=false;
      num= num + 1;
      document.getElementById("Counter_Number").value=num;}
    }
  
    function Decease() {
      num = parseInt(document.getElementById("Counter_Number").value);
      if(num<=-5){
        document.getElementById("Counter_Number").value=-5;
        dcr.disabled=true;
        incr.disabled=false;
      }
      else{
        dcr.disabled=false;
        incr.disabled=false;
      num=num-1;
      document.getElementById("Counter_Number").value=num;
    }}
  
    incr.addEventListener('click', Increase);
    dcr.addEventListener('click', Decease);
  });
  