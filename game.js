var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;
var started = false;

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor((Math.random() * 4) );

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);


  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  level++;

  $("h1").text("Level " + level);

}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}


$('.btn').click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}

function animatePress(currentColour){

  $('#' + currentColour).addClass("pressed");



  setTimeout(function() {

    $("#" + currentColour).removeClass("pressed");

  }, 100);

}


$(document).keydown(function() {

  if(started === false) {
  nextSequence();
  started = true;
};

});

function checkAnswer(currentLevel) {

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("sucess");



  if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }

  }
  else {
    console.log("wronf")
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}
