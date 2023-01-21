

function randomNumber(){
    return (Math.floor((Math.random())*6)) + 1;
}

var randomNumber1=randomNumber();
var randomNumber2=randomNumber();

console.log(randomNumber1);
console.log(randomNumber2);

document.getElementsByClassName("img1")[0].src= "images/dice"+randomNumber1+".png";

document.getElementsByClassName("img2")[0].src= "images/dice"+randomNumber2+".png";

if(randomNumber1>randomNumber2){
    document.querySelector('h1').innerHTML = 'Player 1 Wins the Game';
}
else if(randomNumber1< randomNumber2){
    document.querySelector('h1').innerHTML = 'Player 2 Wins the Game';
}
else{
    document.querySelector('h1').innerHTML = 'Draw';
}

console.log("images/dice"+randomNumber2+".png");


