/*
 * Implementation of a basic hangman game which restricts the user to only use 5-letter "useful" words. 
 * 
 *
 * @author Joseph Nagy
 */

/*
 * Style-related functions
 */
function addGuessesLeft(){
    // guesses left 
    // create guesses left paragraph element 
    let paragraph = document.createElement("p"); 
    paragraph.innerHTML = 10; 

    // append to document 
    document.getElementById("guesses-left").appendChild(paragraph);
}

function addGameDescription(){
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

function removeGameDescription (){ 
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

function getWord(){
    return usefulWords[Math.floor(Math.random() * usefulWords.length)];
}

function letterToNumber(letter){
    return letter.charCodeAt(0) - 97;
}

function getDifficulty(difficulty){
    let element = document.querySelector(`input[name="${difficulty}"]:checked`);
    if (element === null) {
        return -1;
    } else {
        return parseInt(element.value, 10);
    }
}

// returns letters user has NOT guessed as a string 
function getLettersNotGuessed(lettersGuessed){
    notGuessed = alphabet;
    for(i=0; i<lettersGuessed.length;i++){
        if(lettersGuessed[i] in alphabet) {
            notGuessed[letterToNumber(lettersGuessed[i])] = " ";
        }
    }
    return notGuessed;
}

// update document with game status
function loadGuessesRemaining(guessesRemaining){
    let parent = document.getElementById("guesses-remaining"); 
    parent.textContent = String(guessesRemaining); 
}
function loadLettersNotGuessedYet(lettersNotGuessed) {
    let parent = document.getElementById("letters-remaining");
    parent.textContent = String(lettersNotGuessed);
}
function loadHangmanWord (hangmanWord){
    let parent = document.getElementById("hangman-word");
    text = hangmanWord.join(" ");
    parent.textContent = String(text);
}

function updateDisplay(guessesRemaining, lettersNotGuessed, hangmanWord){
    loadGuessesRemaining(guessesRemaining);
    loadLettersNotGuessedYet(lettersNotGuessed);
    loadHangmanWord(hangmanWord);
}



function startGame(){
    // Setup hangman interface

    // get important variables
    secretWord = getWord(); 
    hangmanWord = ["_", "_", "_", "_", "_",];
    lettersGuessed = []; 
    guessesRemaining = getDifficulty("difficulty"); 

    lettersNotGuessed = getLettersNotGuessed(lettersGuessed);
}