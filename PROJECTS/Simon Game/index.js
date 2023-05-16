
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(event){
    // console.log($('#level-title').text);
    if(started ==0){
        $('#level-title').text('level ' + level);
        generateSequence();
        started = 1;
    }
})

function generateRandom(){
    return Math.floor(Math.random()*4);
}

function generateSequence(){

    level++;    
    $('#level-title').text('level ' + level);

    var random = generateRandom();
    var randomColor = buttonColours[random];
    gamePattern.push(randomColor);

    animateBtn(randomColor);

    playSound(randomColor);

}

$('.btn').click(function(event){

    var userClicked = $(this).attr('id');

    pressedBtn(userClicked);

    playSound(userClicked);

    matchSequence(userClicked);
})

function animateBtn(clr){
    $('#' + clr).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(clr){
    var audio = new Audio('sounds/' + clr + '.mp3');
    audio.play();
}

function pressedBtn(clr){
    $('#' + clr).addClass('pressed');
    setTimeout(function(){
        $('#' + clr).removeClass('pressed');
    }, 100);
}

function matchSequence(clr){
    userClickedPattern.push(clr);
    var l = userClickedPattern.length -1;
    if(userClickedPattern[l] == gamePattern[l]){
        if(l+1 == gamePattern.length){
            setTimeout(function(){
                levelUp();
            },100);
        }
    }
    else{
        wrongSound();

        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        setTimeout(function(){
            $('body').removeClass('game-over');
        })

        restart();
    }
}

function levelUp(){
    userClickedPattern = [];
    setTimeout(function(){
        generateSequence();
    },100);
}

function wrongSound(){
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
}

function restart(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = 0;
}









