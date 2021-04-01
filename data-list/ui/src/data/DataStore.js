/*
 * This represents the reactive data to be edited.
 *
 *
 * @author Joseph Nagy
 */

export const dataStore = {
    data: {
        hotels: [],
        message: "Loading...",
        useRemoteServer: true, 
    },

    // get hotel data from server to display
    async getHotelData(sortMethod) {
        // get JSON data from server and use to update app's variables
        const SERVER_URL = this.data.useRemoteServer ? 'https://banana-crisp-68236.herokuapp.com/' : '';
        const sort = sortMethod ? sortMethod : '';
        const url = `${SERVER_URL}api/get_data?sort=${sort}`;
        console.log(url);
        const response = await fetch(url);
        console.log(response);
        const serverData = await response.json();
        console.log(serverData);
        // ensure valid response (HTTP-status is 200-299)
        // and expected data (not error JSON object)
        if (response.ok) {
            // convert server data into Vue data or update existing Vue data
            this.data.hotels = serverData;
            return true;
        } else {
            // may not always be wise to simply echo given error
            this.message = serverData.message;
            return false; 
        }
    },
    async getFilteredHotelData(min, max, sortMethod){
        // get JSON data from server and use to update app's variables
        const SERVER_URL = this.data.useRemoteServer ? 'https://banana-crisp-68236.herokuapp.com/' : '';
        const sort = sortMethod ? sortMethod : '';
        const url = `${SERVER_URL}api/get_filtered_data?min=${min}&max=${max}&sort=${sort}`;
        console.log(url);
        const response = await fetch(url);
        console.log(response);
        const serverData = await response.json();
        console.log(serverData);
        // ensure valid response (HTTP-status is 200-299)
        // and expected data (not error JSON object)
        if (response.ok) {
            // convert server data into Vue data or update existing Vue data
            this.data.hotels = serverData;
            return true;
        } else {
            // may not always be wise to simply echo given error
            this.message = serverData.message;
            return false;
        }

    }
};
