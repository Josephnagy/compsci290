Data List app that displays hotel data based on lat/long, 
data will eventually be used for final project 

@author Joseph Nagy

Note, plain text can be used as comments at the top of the file, then use comment type
appropriate to that section of code.

<template>
  <div id="app">
    <div> 
      <h2> Description </h2>
        <p class="center"> This simple web app returns a list of hotels in Durham using the Hotels.com 
          <a href="https://rapidapi.com/tipsters/api/hotels-com-provider" target="_blank">API</a>. 
        Users can filter and sort the hotels based on the hotel’s nightly rate. If no sorting option is chosen, 
        hotels will be returned in no specific order. If a sorting option is chose, both “Get All Hotel Data” and 
        “Get Filtered Hotel Data” will automatically recognize the sorting option selected and return the hotels in that order.
        It’s important to note that this is not the complete list of hotels in Durham, but simply the first page of hotels returned.  
      </p> 
    </div>
    <h3> Filter By Nightly Rate </h3> 
    <div> 
      <label for="min">Minimum Rate</label>
      <br> 
      <input type="numnber" id="min" autocomplete="off" v-model="minNightlyRate"> 
      <br> 

      <label for="max">Maximum Rate</label>
      <br> 
      <input type="number" id="max" autocomplete="off" v-model="maxNightlyRate"> 
    </div>

    <br>
    <div> 
      <h3> Sort By Nightly Rate </h3> 
      <b-select style="width: 100%" v-model="sortMethod"> 
        <option style="width: 100%" value="1"> No Sorting </option>
        <option style="width: 100%" value="2"> min -> max </option>
        <option style="width: 100%" value="3"> max -> min  </option>
      </b-select>
    </div>

    <br>
    <div> <b-button @click="getHotelData">Get All Hotel Data</b-button> </div>
    <br>
    <div> <b-button @click="getFilteredHotelData">Get Filtered Hotel Data</b-button> </div> 
    
    <div v-if="displayHotelData"> 
      <hotel-list :hotels="hotels">
      </hotel-list>
    </div>

    <div v-else> 
      <span> No Data Yet </span>
    </div>
  </div>
</template>

<script>

import { dataStore } from './data/DataStore.js'
import HotelList  from './components/HotelList'

export default {
  name: 'App',
  components: { 
    HotelList
  }, 

  data () {
    return {
      dataStore: dataStore, 
      displayHotelData: false, 
      minNightlyRate: null, 
      maxNightlyRate: null, 
      sortMethod: null
    }
  }, 

  methods: {
    getHotelData(){
      // attempt to retrieve hotel data 
      let result = this.dataStore.getHotelData(this.sortMethod);

      // if function returns back true, display it 
      if(result){
        this.displayHotelData = true; 
      } else {
        window.alert("failed to retrieve hotel data");
        this.displayHotelData = false;
      }
    }, 
    getFilteredHotelData(){
      // attempt to retrieve filtered hotel data 
      let result = this.dataStore.getFilteredHotelData(this.minNightlyRate, this.maxNightlyRate, this.sortMethod);

      // if function returns back true, display it 
      if(result){
        this.displayHotelData = true; 
      } else {
        window.alert("failed to retrieve hotel data");
        this.displayHotelData = false;
      }
    }
  }, 
  computed: {
    hotels () {
      return this.dataStore.data.hotels; 
    }, 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.center{
  text-align: center;
}
</style>
