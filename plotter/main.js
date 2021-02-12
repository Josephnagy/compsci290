/*
 * Implementation of a basic hangman game which restricts the user to only use 5-letter "useful" words. 
 * 
 *
 * @author Joseph Nagy
 */

// GLOBAL variables
let secretWord = "";
let lettersGuessed = [];
let guessesRemaining = -1;
let possibleWordsRemaining = [];

/*
 * Style-related functions
 */

// helper function to hide HTML elements based on id 
function hideElement(id) {
    document.getElementById(id).style.display = "none";
}

function revealElement(id) {
    document.getElementById(id).style.display = "block";
}

function addGuessesLeft() {
    // guesses left 
    // create guesses left paragraph element 
    let paragraph = document.createElement("p");
    paragraph.innerHTML = 10; // change this to actual value 

    // append to document 
    document.getElementById("guesses-left").appendChild(paragraph);
}

function addGameDescription() {
    // game description header 
    // create game description header element  
    let header = document.createElement("h2");
    let text = document.createTextNode("Game Description");
    // append text to header element 
    header.appendChild(text);
    // append header element to document
    document.getElementById("game-description-header").appendChild(header);

    // game description content 
    // create game description paragraph element  
    let paragraph = document.createElement("p");
    let content = document.createTextNode("THIS IS GAME DESCRIPTION CONTENT"); // add actual text later
    // append text content to paragraph element 
    paragraph.appendChild(content);
    // append paragraph element to document
    document.getElementById("game-description-content").appendChild(paragraph);
}

function addGameInstructions() {
    // game instructions header 
    // create game instructions header element  
    let header = document.createElement("h2");
    let text = document.createTextNode("How To Play");
    // append text to header element 
    header.appendChild(text);
    // append header element to document
    document.getElementById("instructions-header").appendChild(header);

    // game instructions content 
    // create game description paragraph element  
    let paragraph = document.createElement("p");
    let content = document.createTextNode("THIS IS GAME INSTRUCTIONS CONTENT"); // add actual text later
    // append text content to paragraph element 
    paragraph.appendChild(content);
    // append paragraph element to document
    document.getElementById("instructions-content").appendChild(paragraph);
}

function removeGameDescription() {
    document.getElementById("game-description-header").querySelector("h2").remove();
    document.getElementById("game-description-content").querySelector("p").remove();
}

function removeGameInstructions() {
    document.getElementById("instructions-header").querySelector("h2").remove();
    document.getElementById("instructions-content").querySelector("p").remove();
}

/*
 * Game functions
 */

function getWord(remaining) {
    return remaining[Math.floor(Math.random() * remaining.length)];
}

// converts letter to number (ie a=0,b=1,...)
function letterToNumber(letter) {
    return letter.charCodeAt(0) - 97;
}

// change characters in a string 
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function getDifficulty(difficulty) {
    let element = document.querySelector(`input[name="${difficulty}"]:checked`);
    if (element === null) {
        return -1;
    } else {
        return parseInt(element.value, 10);
    }
}

// returns DISPLAY STRING of letters not guessed yet 
function getLettersNotGuessed(lettersGuessed) {
    notGuessed = alphabet;
    lettersGuessed.forEach(letter => {
        if (alphabet.includes(letter)) {
            notGuessed[letterToNumber(letter)] = "_";
        }
    });
    return notGuessed;
}

// OLD METHOD
// for(i=0; i<lettersGuessed.length;i++){
//     if (alphabet.includes(lettersGuessed[i])) {
//         notGuessed[letterToNumber(lettersGuessed[i])] = "_";
//     }
// }
// return notGuessed; }

// update document with game status
function loadGuessesRemaining(guessesRemaining) {
    let parent = document.getElementById("guesses-remaining");
    parent.textContent = String(guessesRemaining);
}
function loadLettersNotGuessedYet(lettersNotGuessed) {
    let parent = document.getElementById("letters-remaining");
    parent.textContent = lettersNotGuessed.join(" ");
}
function loadCurrentTemplate(currentTemplate) {
    let parent = document.getElementById("current-template");
    parent.textContent = String(currentTemplate);
}

function updateDisplay(guessesRemaining, lettersGuessed, currentTemplate) {
    loadGuessesRemaining(guessesRemaining);
    loadLettersNotGuessedYet(getLettersNotGuessed(lettersGuessed));
    loadCurrentTemplate(currentTemplate);
}

function createTemplate(currentTemplate, templateWord, g) {
    let temp = currentTemplate;
    if (templateWord.includes(g)) {
        [...templateWord].forEach(char => {
            if (char === g) {
                temp = setCharAt(temp, [...templateWord].indexOf(g), g);
            }
        });
    }
    return temp;
}


// OLD METHOD
//     for (j = 0; j < currentTemplate.length; j++) {
//         if (templateWord[j] === g){
//             temp = setCharAt(temp, j, g);
//         }
//     }
// }
// return temp; }

/*
* This function constructs a dictionary of hangman word templates as the key, and 
* all of possible words that fit that template as values. 
* 
* It uses createTemplate as a helper function to create templates for each word 
*/
function getNewWordList(currentTemplate, possibleWords, g) {
    let dict = {};
    // populate dict 
    possibleWords.forEach(word => { // same as word = possibleWords[i]
        template = createTemplate(currentTemplate, word, g);
        // if template exists, append word to dict 
        if (Object.keys(dict).includes(template)) {
            dict[template].push(word);
            // else, add key to dict and set equal to array containing word 
        } else {
            dict[template] = [word];
        }
    });

    // OLD METHOD 
    //
    // for (i = 0; i < possibleWords.length; i++) {
    //     word = possibleWords[i];
    //     template = createTemplate(currentTemplate, word, g);
    //     // if template exists, append word to dict 
    //     if (Object.keys(dict).includes(template)) {
    //         dict[template].push(word);
    //     // else, add key to dict and set equal to array containing word 
    //     } else {
    //         dict[template] = [word];
    //     }
    // }

    // find template with most word possibilities 
    let newTemplate = Object.keys(dict).reduce((a, b) => dict[a].length > dict[b].length ? a : b);
    let wordList = dict[newTemplate];
    return [newTemplate, wordList];
}

function letterGuess() {
    // get letter guessed 
    guess = document.getElementById("guessed-letter").value;

    // EDGE CASE: input field is blank 
    if (guess === "") {
        window.alert("Input field was left blank. Please guess a letter.");
        return;
    }
    // EDGE CASE: repeated guess
    if (lettersGuessed.includes(guess)) {
        window.alert("You already guessed that letter. Please pick a new one.");
        return;
    }

    // clever part, change hangman word 
    let n = getNewWordList(currentTemplate, possibleWordsRemaining, guess);
    newTemplate = n[0];
    possibleWordsRemaining = n[1];

    secretWord = getWord(possibleWordsRemaining);
    currentTemplate = newTemplate;

    // CHECK user guess 
    if (secretWord.includes(guess)) {
        // update current 
        currentTemplate = setCharAt(currentTemplate, secretWord.indexOf(guess), guess);
    } else {
        window.alert("that is incorrect!");
    }

    // UPDATE display 
    guessesRemaining--;
    lettersGuessed.push(guess);
    updateDisplay(guessesRemaining, lettersGuessed, currentTemplate);

    // CHECK if game has ended 
    // user lost 
    if (guessesRemaining === 0) {
        // Style Page 
        window.alert("YOU LOST");
        interactiveIDs.forEach(id => { hideElement(id); });
        revealElement("endgame");
        return;
    } // user won
    if (currentTemplate === secretWord) {
        window.alert("YOU WON");
        interactiveIDs.forEach(id => { hideElement(id); });
        revealElement("endgame");
        return;
    }
}

function loadGame() {
    // add/remove elements
    interactiveIDs.forEach(id => { revealElement(id); });
    directionalIDs.forEach(id => { hideElement(id); });
    hideElement("select-difficulty");
    hideElement("start-game-button");
}


function startGame() {
    guessesRemaining = getDifficulty("difficulty");
    // force user to select difficulty
    if (guessesRemaining === -1) {
        window.alert("Please select a difficulty!");
        return;
    }

    // load variables
    secretWord = getWord(usefulWords);
    currentTemplate = "_____"; // 5 underscores
    possibleWordsRemaining = usefulWords;

    // start game
    updateDisplay(guessesRemaining, lettersGuessed, currentTemplate);
    loadGame();
}

function playAgain() {
    // reveal description + instructions
    directionalIDs.forEach(id => { revealElement(id); });
    // reveal difficulty selection
    revealElement("select-difficulty");
    //hide play-again button 
    hideElement("endgame");

    // set variables 
    secretWord = "";
    lettersGuessed = [];
    // reset difficulty
    document.getElementsByName("difficulty").forEach(n => { n.checked = false; });

    // update display 
    updateDisplay(guessesRemaining, lettersGuessed, currentTemplate);

    // prompt user to start game 
    revealElement("start-game-button");
}