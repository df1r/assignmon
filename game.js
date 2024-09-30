const buttonColors = ["red", "blue", "green", "yellow"];
const redSound = new Audio("./sounds/red.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const greenSound = new Audio("./sounds/green.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");
const soundArray = {"red":redSound,"blue":blueSound,"green":greenSound,"yellow":yellowSound};
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var userChosenColor;
var currLevel;
var userInputCount;
function buttonFlashSound(whichButton) {
    soundArray[whichButton].play();
    $("#"+whichButton).addClass("pressed");
    setTimeout(function() {
        $("#"+whichButton).removeClass("pressed");
    },100);
}
function pushToSequence() {
    //console.log("pushToSequence(), length of game pattern = "+gamePattern.length);
    randomNumber=Math.floor(4*Math.random());
    randomColor=buttonColors[randomNumber];
    gamePattern.push(randomColor);
    buttonFlashSound(randomColor);
    currLevel++;
}
function startGame() {
    //console.log("startGame()");
    currLevel=0;
    gamePattern=[];
    userInputCount=0;
    userClickedPattern=[];
    $("h1").text("Level "+currLevel);
    $(document).unbind();
    setTimeout(pushToSequence,1000);
    $(".btn").click(playMove);
}
function playMove() {
    $(".btn").unbind();
    userChosenColor=$(this).attr("id");
    if (userChosenColor === gamePattern[userInputCount]){
        userInputCount++;
        userClickedPattern.push(userChosenColor);
        buttonFlashSound(userChosenColor);
        if(userInputCount === currLevel) {
            $("h1").text("Level "+currLevel);
            userInputCount=0;
            userClickedPattern=[];
            setTimeout(pushToSequence,1000);
            $(".btn").click(playMove);
        } else {
            $(".btn").click(playMove);
        }
    } else {
        wrongSound.play();
        $("h1").text(instructionText);
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            // true for mobile device
            $(document).click(startGame);
        }else{
            // false for not mobile device
            $(document).keydown(startGame);
        }
    }
}
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    instructionText="Tap anywhere to start game";
    $("h1").text(instructionText);
    $(document).click(startGame);
  }else{
    // false for not mobile device
    instructionText="Press any key to start game";
    $("h1").text(instructionText);
    $(document).keydown(startGame);
  }
