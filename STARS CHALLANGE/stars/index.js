var star="";
var i =0;
var b=false;
for(var t=1; t <=5; t++){
while(b==false ){
     i+=1;
     star=star+'*';
     console.log(star);
    if(i==5){
        b=true;
    }
}

while (b==true){
    i-=1;
    star=star.slice(0,-1);
    console.log(star);
    if(i==0){
        b=false;
    }
}
}