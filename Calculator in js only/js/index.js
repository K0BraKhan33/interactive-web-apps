

let inum = 0;
let sNum = '';
let iTotal = 0;

function num1(){
    sNum=sNum+'1';
     inum=parseFloat(sNum);
     console.log(inum)
}
function num2(){
    sNum=sNum+'2';
    inum=parseFloat(sNum);
    console.log(inum)
}

function num3(){
    sNum=sNum+'3';
    inum=parseFloat(sNum);
    console.log(inum)
}
function num4(){
    sNum=sNum+'4';
    inum=parseFloat(sNum);
    console.log(inum)
}
function num5(){
    sNum=sNum+'5';
    inum=parseFloat(sNum);
    console.log(inum)
}
function num6(){
    sNum=sNum+'6';
    inum=parseFloat(sNum);
    console.log(inum)
}
function num7(){
    sNum=sNum+'7';
    inum=parseFloat(sNum);
    console.log(inum)
  }
function num8(){
    sNum=sNum+'8';
    inum=parseFloat(sNum);
    console.log(inum)
}
function num9(){
    sNum=sNum+'9';
    inum=parseFloat(sNum);
    console.log(inum)
}
function num0(){
    sNum=sNum+'0';
    inum=parseFloat(sNum);
    console.log(inum)
}


const number1=document.getElementById('b6');
number1.addEventListener('click',num1);
const number2=document.getElementById('b7');
number2.addEventListener('click',num2);
const number3=document.getElementById('b8');
number3.addEventListener('click',num3);
const number4=document.getElementById('b9');
number4.addEventListener('click',num4);
const number5=document.getElementById('b10');
number5.addEventListener('click',num5);
const number6=document.getElementById('b11');
number6.addEventListener('click',num6);
const number7=document.getElementById('b12');
number7.addEventListener('click',num7);
const number8=document.getElementById('b13');
number8.addEventListener('click',num8);
const number9=document.getElementById('b14');
number9.addEventListener('click',num9);
const number0=document.getElementById('b15');
number0.addEventListener('click',num0);

function calculate(){
    console.log(iTotal);
    inum=0
}
function ac(){
     inum=0;
     sNum='';
     iTotal=0;
    console.log(iTotal);
}
function plus(){

    iTotal=iTotal+inum;
    console.log('total is now:'+ iTotal +' was added:'+inum)
    console.log('+');
    calculate();
    console.log(iTotal);
    inum=0
    sNum=''
}



function subtract(){

    iTotal=iTotal-inum;
    console.log('total is now:'+ iTotal +' was added:'+inum)
    console.log('-');
    calculate();
    console.log(iTotal);
    inum=0
    sNum=''
}


function total(){

    iTotal=iTotal;
    console.log('total is now:'+ iTotal +' was added:'+inum)
    console.log('=');
    calculate();
    console.log(iTotal);
    inum=0
    sNum=''
}


function multiply(){

    iTotal=iTotal*inum;
    console.log('total is now:'+ iTotal +' was added:'+inum)
    console.log('*');
    calculate();
    console.log(iTotal);
    inum=0
    sNum=''
}

function devide(){

    iTotal=iTotal/inum;
    console.log('total is now:'+ iTotal +' was devided:'+inum)
    console.log('/');
    calculate();
    console.log(iTotal);
    inum=0
    sNum=''
}
function plus1(){
    p=true;
    m=false;
    t=false;
    d=false
}





const Add=document.getElementById('b1');
Add.addEventListener('click',plus);

const Minus=document.getElementById('b2');
Minus.addEventListener('click',subtract);

const equals=document.getElementById('b3');
equals.addEventListener('click',total);

const times=document.getElementById('b4');
times.addEventListener('click',multiply);

const devides=document.getElementById('b5');
devides.addEventListener('click',devide);


