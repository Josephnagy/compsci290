/*
 * Implementation of a basic hangman game which restricts the user to only use 5-letter "useful" words. 
 * 
 *
 * @author Joseph Nagy
 */

function removeGameDescription (){ 
     document.getElementById("game-description-header").remove();
     document.getElementById("game-description-content").remove();
 }

function removeGameInstructions() {
    document.getElementById("instructions-header").remove();
    document.getElementById("instructions-content").remove();
}

function startGame(){
    removeGameDescription(); 
    removeGameInstructions(); 
}