var words = ["Darth Vader", "Luke Skywalker", "Han Solo", "Chewbacca", "Leia Organa", "Lando Calrissian", "Millennium Falcon"];
var winCounter = 0;

newGame();

function newGame() {
	var currentWord = getWord(words);
	var displayWord = makeBlanks(currentWord);
	var guessTracker = [];
	document.getElementById("lettersGuessed").innerHTML = "";
	document.getElementById("goAgain").innerHTML = "";
	document.getElementById("wordBox").innerHTML = displayWord;
	document.getElementById("winBox").innerHTML = winCounter;
	var turnsRemain = 10;
	document.getElementById("turnsRemaining").innerHTML = turnsRemain;

	document.onkeyup = function(event) {
		currentGuess = event.key.toLowerCase();
		var newGuess = true;
		for (i = 0 ; i < guessTracker.length ; i++) {
			if (currentGuess === guessTracker[i]) {
				document.getElementById("messageBoard").innerHTML = "You already guessed that one, go again...";
				newGuess = false;				
			}
		}

		if (newGuess === true) {
			guessTracker.push(currentGuess);
			document.getElementById("lettersGuessed").innerHTML = guessTracker;
			document.getElementById("letterSelection").innerHTML = currentGuess;
			guessChecker = checkGuess(currentGuess, displayWord, currentWord);

			if (displayWord !== guessChecker) {
				displayWord = guessChecker;
				document.getElementById("wordBox").innerHTML = displayWord;
				document.getElementById("messageBoard").innerHTML = "Great shot, kid! It's on the board.";
			}
			else {
				turnsRemain--;
				document.getElementById("turnsRemaining").innerHTML = turnsRemain;
				document.getElementById("messageBoard").innerHTML = "That's a miss. Try again.";
			}
		
			if (guessChecker === currentWord) {
				winCounter++;
				document.getElementById("messageBoard").innerHTML = "The Force was with you. Well done!";
				document.getElementById("goAgain").innerHTML = "Press any key to play again.";
				document.onkeyup = function() {
					document.getElementById("messageBoard").innerHTML = "Here we go again!";
					newGame();
				}
			}

			if (turnsRemain === 0) {
				document.getElementById("messageBoard").innerHTML = "You lost. Relax, nobody's getting frozen in carbonite.";
				document.getElementById("goAgain").innerHTML = "Press any key to play again.";
				document.onkeyup = function() {
					document.getElementById("messageBoard").innerHTML = "Here we go again!";
					newGame();
				}
			}
		}
	}
}

function getWord() {
	return words[Math.floor(Math.random() * words.length)];
}

function makeBlanks(newAnswer) {
	var blankSet = "";
	for (i = 0 ; i < newAnswer.length ; i++) {
		blankSet = blankSet + "_";
	}
	return blankSet;
}

function checkGuess(guess, display, answer) {

	for (i = 0 ; i < answer.length ; i++) {
		if (guess === answer.charAt(i)) {
			display = replaceAt(display, i, guess);
		}
		else if (guess.toUpperCase() === answer.charAt(i)) {
			display = replaceAt(display, i, guess.toUpperCase());
		}
	}
	return display;		
}

function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}
