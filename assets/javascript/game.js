// Wins
var win = 0;

// Current Word for computer
var currentWord = "";

// current word for user display
var currentWordDisplay = "";

// user guess container
var userGuessArray = [];

// Number of guesses remaining
var guess = 10;

var x = document.getElementById("myAudio");

// Word object
var hangmanWord = {
    w0: ["d", "e", "m", "e", "n", "t", "o", "r"],
    w1: ["h", "a", "r", "r", "y"],
    w2: ["d", "u", "m", "b", "l", "e", "d", "o", "r", "e"],
    w3: ["g", "r", "i", "f", "f", "i", "n", "d", "o", "r"],
    w4: ["h", "e", "r", "m", "o", "i", "n", "e"],
    w5: ["r", "a", "v", "e", "n", "c", "l", "a", "w"],
    w6: ["v", "o", "l", "d", "e", "m", "o", "r", "t"],
    w7: ["h", "o", "g", "w", "a", "r", "t", "s"],
    w8: ["q", "u", "i", "d", "d", "i", "t", "c", "h"],
    w9: ["h", "e", "d", "w", "i", "g"],
    w10: ["m", "u", "g", "g", "l", "e"],

    // function to print letters guessed by user so far

    printUserGuess: function (userguess) {
        var printWord = "";
        for (i = 0; i < userguess.length; i++) {
            printWord = printWord + userguess[i] + " ";
        };

        return printWord;
    },


    // function to display status of current word

    printUnderscore: function (userguess) {
        var printWord = "";
        for (i = 0; i < currentWord.length; i++) {

            if (userguess.indexOf(currentWord[i]) > -1) {
                printWord = printWord + currentWord[i] + " ";
            }
            else {
                printWord = printWord + "_ ";
            };
        };

        return printWord;
    },

   // function to blink correctly guessed letter

    blinkWord: function () {
        document.getElementById("current-word").setAttribute("style", "animation-name: flash; animation-duration: 2s; color: blue;");
    }

};

 // function  to initialize the game to a starting point

 function initGame() {
    guess = 10;
    currentWord = hangmanWord["w" + Math.floor(Math.random() * 10)];
    userGuessArray.length = 0;
    document.getElementById("current-word").setAttribute("style", "color: black;");
    currentWordDisplay = hangmanWord.printUnderscore(userGuessArray);
    // console.log(currentWord);
    document.getElementById("win-count").innerHTML = win;
    document.getElementById("current-word").innerHTML = currentWordDisplay;
    document.getElementById("guess-remaining").innerHTML = guess;
    document.getElementById("letters-guessed").innerHTML = hangmanWord.printUserGuess(userGuessArray);
}

// ----------------------------------------------------------------------------------------------
// Start of the game
// ----------------------------------------------------------------------------------------------

// Set initial status
initGame();


document.onkeyup = function (event) {

    if (guess > 0) {
        var currentKey = event.key;

        if (!userGuessArray.includes(currentKey)) {

            // display the letters currently guessed by the user
            userGuessArray.push(currentKey);
            document.getElementById("letters-guessed").innerHTML = hangmanWord.printUserGuess(userGuessArray);

            // check if the current user key is among the letters in the chosen word
            // display letter in 'current word' if it matches
            currentWordDisplay = hangmanWord.printUnderscore(userGuessArray);
            document.getElementById("current-word").innerHTML = currentWordDisplay;

            // decrement 'guess' and display it's updated value
            guess--;
            document.getElementById("guess-remaining").innerHTML = guess;

            // check if the letter's been correctly guessed and start a new game
            if (guess > -1 && !currentWordDisplay.includes("_")) {
                win++;
                document.getElementById("win-count").innerHTML = win;
                x.play();
                hangmanWord.blinkWord();
                setTimeout(initGame, 2000);
                

            }
            // check if the guess limit is crossed and start a new game
            else if (guess == 0) {
                initGame();
            };
        }
    };


};



