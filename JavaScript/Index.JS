
var num= document.getElementById("Counter_Number")
console.log(num)


function Increase(){
    console.log(1);
}

function Decease(){
    console.log(2);
}

document.getElementById("INC").addEventListener('click', Increase) 

document.getElementById("DINC").addEventListener('click', Decease)  

