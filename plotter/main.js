/*
 * Implementation of a basic hangman game which restricts the user to only use 5-letter "useful" words. 
 * 
 * The list of words was obtained from Donald Knuth as part of the Stanford Graph Base. This set of words contains 
 * 5757 common five-letter words, which meet the following criteria:
 * 
 * 1) no proper nouns
 * 2) no punctuation, hyphens, or accent marks
 * 3) no extremely rare words that would only be useful to Scrabble players
 * 
 * The git repo can be find here: "https://git.charlesreid1.com/cs/five-letter-words/raw/branch/master/sgb-words.txt"
 *
 * @author Joseph Nagy
 */