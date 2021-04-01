/*
 * This represents the server for my Data List / final project 
 *
 *
 * @author Joseph Nagy
 */

// set up dependencies: these modules export functions that can then be called below
// package for responding to requests for a specific URL
const express = require('express');
// package for logging attempts to access the server (for easier debugging)
const morgan = require('morgan');
// package that replicates fetch functionality built into the browser
const fetch = require('node-fetch');
// package that bundles up query parameters given as an Object into URL syntax
const querystring = require('querystring');
// package that allows certain URLs to access the server
const cors = require('cors');
const { json } = require('express');

// set up server specific configuration values
const {HOTEL_API} = require('./secrets');
// allow code to be run locally or when deployed on a remote host
const PORT = process.env.PORT || 3000;

// make a generic server and start listening for requests
const app = express();

// allow connections from anywhere
app.use(cors());

//---------------------------------------------------------------------
// set up middleware apps that manage "all" URL requests
// log all requests made to the server
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// setup CORS options for maximum security
const whitelist = ['https://compsci290_2021spring.dukecs.io', 'http://localhost:8080'];
const corsOptions = {
    origin: (origin, callback) => {
        // only allow sites listed above or dev-server proxies to access server data
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            const err = new Error('CORS Error: This site is not authorized to access this resource.');
            err.status = 401;
            callback(err);
        }
    },
};
// allow connections from anywhere
// app.use(cors());
app.use(cors(corsOptions));

//---------------------------------------------------------------------
// utility functions
// simple function to factor out common code from the API methods
async function getJSON(url, parameters, headers) {
    const response = await fetch(`${url}?${querystring.stringify(parameters)}`, headers);
    return response.json();
}

// access Hotels.com API to get hotel data
// NOTE: add parameters later, focus on getting it to work first 
async function fetchHotelData() {
    // set up query parameters needed to get interesting data
    const parameters = {
        // specify locale
        locale: "en_US",
        // longitude in which searching for nearby hotels 
        longitude: -78.911261,
        // currency to return prices in 
        currency: "USD",
        // latitude in which searching for nearby hotels 
        latitude: 35.996653,
        // number of adults staying at hotel
        adults_number: 1, 
        // check-in date (YYYY-MM-DD)
        checkin_date: "2021-04-26",
        // check-out date (YYYY-MM-DD)
        checkout_date: "2021-05-01",
        // sort order to return results (few options in the documentation)
        sort_order: "STAR_RATING_HIGHEST_FIRST"
    };
    const headers = {
        headers: {
            // send token 
            "X-RapidAPI-Key": HOTEL_API.TOKEN
        }
    }
    // fetch data from the API using the set parameters
    const jsonData = await getJSON(HOTEL_API.URL, parameters, headers);
    // make sure results were returned
    if (jsonData.searchResults?.results?.length > 0) {
        // return just the fields needed by frontend 
        return jsonData.searchResults.results;
    }

    // report invalid API data returned (including NO images matching weather forecast)
    throw new Error(`Hotel API Error: ${jsonData.message}`);
}

//---------------------------------------------------------------------
// compare functions for sorting 

function compareHotelPrices(hotel1, hotel2){
    if (hotel1.ratePlan.price.exactCurrent > hotel2.ratePlan.price.exactCurrent) return 1;
    if (hotel2.ratePlan.price.exactCurrent > hotel1.ratePlan.price.exactCurrent) return -1;
}


//---------------------------------------------------------------------
// set up URL responses:
// provide some response to visiting the server directly (i.e., its homepage)
app.get(
    '/',
    (req, res) => {
        res.status(200);
        res.send('<a href="api/get_data">Get the Data!</a>');
    },
);

// return the JSON data resulting from remote API requests
app.get(
    '/api/get_data',
    async (req, res, next) => {
        try {
            // use named query parameters to pass to our functions
            const hotelData = await fetchHotelData();
            // everything is OK, so report back to browser
            res.status(200);
            // define sort so code is more readable
            let sort = req.query.sort;
            // construct JSON object to return, must match what frontend is expecting
            // sort data if sorting method provided 
            if(req.query.sort){
                // sort by price: min -> max
                if(sort==="2"){
                    res.json(hotelData.sort(compareHotelPrices));
                // sort by price: max -> min
                } else if (sort==="3"){
                    res.json(hotelData.sort(compareHotelPrices).reverse());
                // no sorting
                } else {
                    res.json(hotelData);
                }
            } else {
                res.json(hotelData);
            }
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
            // forward error on to next middleware handler (the error handler defined below)
            next(err);
        }
    },
);

// return the filtered JSON data resulting from remote API requests
app.get(
    '/api/get_filtered_data',
    async (req, res, next) => {

        // without min & max, cannot do a proper filtered so report "user error"
        if (!(req.query.min && req.query.max)) {
            // create error object with useful message
            const err = new Error('Usage: please provide a min and max as query parameters');
            // set status code to return with response
            err.status = 400;
            // forward error on to next middleware handler (the error handler defined below)
            next(err);
            return;
        }

        try {
            // use named query parameters to pass to our functions
            const hotelData = await fetchHotelData();
            // everything is OK, so report back to browser
            res.status(200);

            // filter JSON data based on hotel price 
            let min = parseInt(req.query.min);
            let max = parseInt(req.query.max);
            let filteredHotelData = hotelData.filter(hotel => hotel.ratePlan.price.exactCurrent > min && hotel.ratePlan.price.exactCurrent < max);
            // let filteredHotelData = hotelData;
            // construct JSON object to return, must match what frontend is expecting
            console.log(filteredHotelData);
            console.log("filtered hotels:" + filteredHotelData.length);

            // after filtering, sort 

            // define sort so code is more readable
            let sort = req.query.sort;
            // construct JSON object to return, must match what frontend is expecting
            // sort data if sorting method provided 
            if (req.query.sort) {
                // sort by price: min -> max
                if (sort === "2") {
                    res.json(filteredHotelData.sort(compareHotelPrices));
                    // sort by price: max -> min
                } else if (sort === "3") {
                    res.json(filteredHotelData.sort(compareHotelPrices).reverse());
                    // no sorting
                } else {
                    res.json(filteredHotelData);
                }
            } else {
                res.json(filteredHotelData);
            }
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
            // forward error on to next middleware handler (the error handler defined below)
            next(err);
        }
    },
);


// handle errors thrown by the application code
// NOTE, this actually must be defined LAST in order to catch any errors from others
app.use((err, req, res, next) => {
    console.log(err);
    // delegate to default Express error handler if HTTP header info has already been sent back
    if (res.headersSent) {
        next(err);
        return;
    }
    // set error status and return error message as JSON
    // since that is what the frontend is expecting
    res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));