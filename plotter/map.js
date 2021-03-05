/*
 * Map description 
 *
 *
 * @author Joseph Nagy
 */

let data;
let countries = []; 

// create a world map, displayed in DIV with ID 'map', centered at the equator, covered by 2 levels of tiles
let map = L.map('map').setView([0, 0], 2);

L.tileLayer("https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=V9UA3w8dVYjcXQM5PwGA",{
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

// helper function to format string for money 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// helper function to parse lat/lng data 
function getLatLng(lat, lng){
    // add minutes 
    let latitude = parseFloat(lat.degrees.toString() + "." + lat.minutes.toString()); 
    let longitude = parseFloat(lng.degrees.toString() + "." + lng.minutes.toString()); 

    // check latitude 
    if(lat.hemisphere ==="S"){
        latitude *= -1; 
    }
    // check longitude 
    if (lng.hemisphere === "W") {
        longitude *= -1;
    }
    return [latitude, longitude];
}

// filters out undefined lat/lng values and returns array of country keys 
function filterKeysForGPS(keys){
    filteredKeys = Object.values(keys).filter((key) => countries[key].data.geography);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.geography.geographic_coordinates);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.geography.geographic_coordinates.latitude);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.geography.geographic_coordinates.longitude);  
    return filteredKeys;
}

// filters out undefined gdp values and returns array of country keys 
function filterKeysForGDP(keys){
    filteredKeys = Object.values(keys).filter((key) => countries[key].data.economy);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.economy.gdp);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.economy.gdp.purchasing_power_parity);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.economy.gdp.purchasing_power_parity.annual_values);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.economy.gdp.purchasing_power_parity.annual_values[0]);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.economy.gdp.purchasing_power_parity.annual_values[0].value);
    return filteredKeys;
}

// filters out undefined poverty values and returns array of country keys 
function filterKeysForPoverty(keys){
    // poverty rate percentage  
    filteredKeys = Object.values(keys).filter((key) => countries[key].data.economy);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.economy.population_below_poverty_line);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.economy.population_below_poverty_line.value);

    // population count 
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.people);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.people.population);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.people.population.total);
    return filteredKeys; 
}

function filterKeysForDefenseBudget(keys){
    filteredKeys = Object.values(keys).filter((key) => countries[key].data);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.military_and_security);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.military_and_security.expenditures);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.military_and_security.expenditures.annual_values);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.military_and_security.expenditures.annual_values[0]);
    filteredKeys = Object.values(filteredKeys).filter((key) => countries[key].data.military_and_security.expenditures.annual_values[0].value);
    return filteredKeys; 
}

function clearMap(){
    map.eachLayer((layer) => {
        // do not remove the map tiles
        if (!layer.getTileUrl) {
            layer.remove();
        }
    });
}

function formatPovertyPopupHTML(countryName, annualDefenseBudget, citizensInPoverty, ratio ){
    // country name 
    htmlString = "<b id='map-popup-header'>" + countryName + "</b>"; 

    // annual defense budget  
    htmlString += "<p id='map-popup-text'>Annual Defense Budget: $" + numberWithCommas(annualDefenseBudget) + "<p>";

    // citizens in poverty 
    htmlString += "<p id='map-popup-text'>Citizens In Poverty: " + numberWithCommas(Math.ceil(citizensInPoverty)) + "<p>";

    // ratio 
    htmlString += "<p id='map-popup-text'>Defense to Poverty Ratio: " + numberWithCommas(Math.ceil(ratio)) + "<p>";


    return htmlString; 
}

// pushes each country to global list of countries
function displayMilitaryData(jsonData) {
    // get initial data 
    data = jsonData;
    countries = {}; 
    countries = data.countries; 

    // filter data 
    filteredKeys = Object.keys(countries).filter((key) => countries[key].data);
    // filter keys for lat/long
    filteredKeys = filterKeysForGPS(filteredKeys);
    // filter keys for gdp  
    filteredKeys = filterKeysForGDP(filteredKeys);
    // filter keys for poverty rate 
    filteredKeys = filterKeysForPoverty(filteredKeys); 
    // filter keys for defense budget 
    filteredKeys = filterKeysForDefenseBudget(filteredKeys); 

    Object.values(filteredKeys).filter((key) => {

        // get defense budget  
        annualGDP = countries[key].data.economy.gdp.purchasing_power_parity.annual_values[0].value;  // index 0 is most recent 
        annualDefenseBudgetPercentage = countries[key].data.military_and_security.expenditures.annual_values[0].value;
        annualDefenseBudget = annualGDP * annualDefenseBudgetPercentage; 

        // get poverty
        percentageBelowPovertyLine = countries[key].data.economy.population_below_poverty_line.value;
        population = countries[key].data.people.population.total;
        populationInPoverty = percentageBelowPovertyLine * population; 

        // calculate military-to-poverty ratio 
        mtpr = annualDefenseBudget / populationInPoverty; 

        // get position 
        lat = countries[key].data.geography.geographic_coordinates.latitude;
        lng = countries[key].data.geography.geographic_coordinates.longitude;
        position = getLatLng(lat, lng); 

        // add to map 
        circle = L.circle(position, {radius: mtpr*100}).addTo(map); 

        // add popup 
        countryName = countries[key].data.name;
        htmlText = formatPovertyPopupHTML(countryName, annualDefenseBudget, populationInPoverty, mtpr);
        circle.bindPopup(htmlText);
    });
}