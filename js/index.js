$(document).ready(function () {
  preload([
    '../img/parchment.jpg',
    '../img/alert-parchment.png',
    '../img/hangman1.png',
    '../hangman/img/hangman2.png',
    '../img/hangman3.png',
    '../img/hangman4.png',
    '../img/hangman5.png',
    '../img/hangman6.png',
    '../img/hangman7.png',
    '../img/hangman8.png'
  ]);
});

var word;
var wordArray;
var guesses = [];
var hangmanParts = 1;
var joinLetters;
var joinLettersGapped;
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

//preload images
function preload(images) {
    $(images).each(function(){
        $('<images/>')[0].src = this;
    });
}

// grab first random word and set up board
grabWord();


// function that runs when letter is guessed. 
function guessLetter(letterValue) {  
  var pos = word.indexOf(letterValue);
  
  if (pos == -1) {
    hangmanParts++;
    document.getElementById("img").src = "../hangman/img/hangman" + hangmanParts + ".png";
    checkLose();   
  } else {
    for (b = 0; b < word.length; b++) {
      if (wordArray[b] == letterValue) {
        guesses[b] = letterValue;
      }
    }
    join();
    
  }  

}

// function to randomly pick word from database at start of each round
function grabWord() {
      $.getJSON("../wordlist.json", function(json) {
        
        var randNum = Math.floor(Math.random() * (1328 - 1 + 1));
        
        word = json[randNum].toUpperCase();
        console.log(word);
        
        wordArray = [...word];
        
        underScores();
        join();

      });  
  
}

// function to find random word's length and display correct # of underscores at top for each game
function underScores() {
  guesses = [];

  for (a = 0; a < word.length; a++) {
    guesses.push("_");  
  }

}

// function to redraw the word when a letter is correctly guessed and run checkWin
function join() {
  joinLettersGapped = guesses.join(" ");
  joinLetters = guesses.join("");
  document.getElementById("theWord").innerHTML = joinLettersGapped;
  checkWin();
}

// function to check for win when a letter is correctly guessed
function checkWin() {
  if (word == joinLetters) {
    document.getElementById("alert-copy").innerHTML = "YOU'RE A WINNER!";
    document.getElementById("messages").style.display = "block";
    setTimeout(function() {
      document.getElementById("messages").style.display = "none";
      resetAll();
    }, 2000);
  } else {}

}


// function to check for a full hangman when letter guess is wrong, and reset if full hangman
function checkLose() {
  if (hangmanParts == 8) {
    document.getElementById("alert-copy").innerHTML = "WHY NOT HANG AROUND?";
    setTimeout(function() {
      document.getElementById("messages").style.display = "block";
    }, 750);      
    setTimeout(function() {
      document.getElementById("messages").style.display = "none";
      resetAll();
    }, 2750);
  }
}

// function to switch buttons to guessed state when pressed
function guessedLetter(buttonID) {
  console.log(buttonID);
  document.getElementById(buttonID).className = "btn btn-success btn-lg letterButtonsGuessed";
}



//buttons

function letterHolder(guess) {
  guessLetter(guess);
  guessedLetter(guess); 
  //prevent browser's default action
  evt.preventDefault();  
}

$('#A').click(function(evt) {
  letterHolder("A");
}); //end A button 

$('#B').click(function(evt) {
    letterHolder("B");
}); //end B button 

$('#C').click(function(evt) {
    letterHolder("C");
}); //end C button 

$('#D').click(function(evt) {
    letterHolder("D");
}); //end D button 

$('#E').click(function(evt) {
    letterHolder("E");
}); //end E button 

$('#F').click(function(evt) {
    letterHolder("F");
}); //end F button 

$('#G').click(function(evt) {
    letterHolder("G");
}); //end G button 

$('#H').click(function(evt) {
    letterHolder("H");
}); //end H button 

$('#I').click(function(evt) {
    letterHolder("I");
}); //end I button 

$('#J').click(function(evt) {
    letterHolder("J");
}); //end J button 

$('#K').click(function(evt) {
    letterHolder("K");
}); //end K button 

$('#L').click(function(evt) {
    letterHolder("L");
}); //end L button 

$('#M').click(function(evt) {
    letterHolder("M");
}); //end M button 

$('#N').click(function(evt) {
    letterHolder("N");
}); //end N button 

$('#O').click(function(evt) {
    letterHolder("O");
}); //end O button 

$('#P').click(function(evt) {
    letterHolder("P");
}); //end P button 

$('#Q').click(function(evt) {
    letterHolder("Q");
}); //end Q button 

$('#R').click(function(evt) {
    letterHolder("R");
}); //end R button 

$('#S').click(function(evt) {
    letterHolder("S");
}); //end S button 

$('#T').click(function(evt) {
    letterHolder("T");
}); //end T button 

$('#U').click(function(evt) {
    letterHolder("U");
}); //end U button 

$('#V').click(function(evt) {
    letterHolder("V");
}); //end V button 

$('#W').click(function(evt) {
    letterHolder("W");
}); //end W button 

$('#X').click(function(evt) {
    letterHolder("X");
}); //end X button 

$('#Y').click(function(evt) {
    letterHolder("Y");
}); //end W button 

$('#Z').click(function(evt) {
    letterHolder("Z");
}); //end X button 


$('#reset').click(function(evt) {

  resetAll();

  //prevent browser's default action
  evt.preventDefault();
}); //end submit button 


// function to reset game
function resetAll() {
  // RESET ILLUSTRATION
  document.getElementById("img").src = "../img/hangman1.png";
  
  // RESET THE LETTER BUTTONS 
  for (var i=0; i<alphabet.length; i++) {
    var letter = alphabet[i];
    document.getElementById(letter).className = "btn btn-default btn-lg letterButtons";
  }
    
  hangmanParts = 1;
  
  grabWord();
    
  for (a = 0; a < word.length; a++) {
    guesses[a] = "_";
  }  
}
