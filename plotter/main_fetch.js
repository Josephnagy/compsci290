/*
 * 
 * Uses current fetch call with built-in promise.
 * 
 * getData() and parseData() are used to connect to World Factbook API 
 *
 * @author Joe Nagy
 */
const url = "https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/master/data/factbook.json"

// load links from data file dynamically 
function getData(url) {
    // get data from the API AND
    fetch(url)
        // when it is done, convert response from JSON string to JavaScript data structure 
        .then(response => response.json())
        .then(jsonData => {
            displayMilitaryData(jsonData);
        })
        .catch(error => console.error(error));
}