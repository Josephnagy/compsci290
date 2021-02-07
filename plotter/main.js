/*
 * Implementation of a basic hangman game which restricts the user to only use 5-letter "useful" words. 
 * 
 *
 * @author Joseph Nagy
 */

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

function getWord() {
    return usefulWords[Math.floor(Math.random() * usefulWords.length)];
}


function startGame() {
    // Remove instructions 
    removeGameDescription();
    removeGameInstructions();
}