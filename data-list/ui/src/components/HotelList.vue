COMMENTS

<template>
  <b-list-group>
      <div> 
        <div>Total number of hotels in Durham: {{hotelCount}}</div>
        <div>Lowest hotel rate: {{lowestHotelPrice}} per night</div>
        <div>Highest hotel rate:  {{highestHotelPrice}} per night</div>
      </div>
      <hotel-list-item 
        v-for="(hotel, h) in hotels"
        :key="h"
        :name="hotel.name"
        :nightlyRate="hotel.ratePlan.price.current"
        :starRating="hotel.starRating"
        :address="hotel.address"
        >
      </hotel-list-item> 
  </b-list-group> 
</template>

<script>
import HotelListItem from './HotelListItem.vue'

export default {
  name: 'HotelList',
  components: {
    HotelListItem
  },
  props: {
    hotels: {
      type: Array, 
    }
  }, 
  computed: {
    hotelCount() {
      return this.hotels.length;
    }, 
    lowestHotelPrice() {
      if(this.hotels.length === 0){
        return "$0";
      }
      let cheapestHotelObject = this.hotels.reduce(function(prev, curr) { return prev.ratePlan.price.exactCurrent < curr.ratePlan.price.exactCurrent ? prev : curr;});
      return cheapestHotelObject.ratePlan.price.current;
    }, 
    highestHotelPrice(){
      if(this.hotels.length === 0){
        return "$0";
      }
      let mostExpensiveHotelObject = this.hotels.reduce(function(prev, curr) { return prev.ratePlan.price.exactCurrent > curr.ratePlan.price.exactCurrent ? prev : curr;});
      return mostExpensiveHotelObject.ratePlan.price.current;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
