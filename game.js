var buttonColors = ["red", "blue", "green", "yellow"]; //available patterns
var gamePattern = []; //Keeps track of pattern
var userClickedPattern = []; //Keeps track of user pattern
var started = false; //indicates if game is on going
var level = 0; //indicates Level
var highScore = 0;

//Event listener for start button
$(".startButton").click(function() {
  if (started === false) {
    nextSequence();
    started = true;
    $(".startButton").hide();
  }
});

//Event listener for colored buttons
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length -1);
});

//Checks if the users pattern matches the game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { //If failed
    playSound("wrong");
    animateGameOver();
    $("#level-title").text("Game Over, The pink button to restart");
    startOver();
  }
}

//Add the next sequence to the games pattern.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//Adds animation to the buttons when pressed
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Adds animation for when game is over
function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
}

//Adds sound for each button pressed
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Resets the game for when you fail and sets high score
function startOver() {
  if(level > highScore) {
    highScore = level -1;
    $("h3").text("High Score: " + highScore);
  }
  level = 0;
  gamePattern = [];
  started = false;
  $(".startButton").show();
}
