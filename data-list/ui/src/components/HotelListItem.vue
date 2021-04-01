<template>
  <b-list-group-item> 
    <p> {{name}} </p> 
    <p> {{nightlyRate}} per night </p> 
    <b-button v-b-modal="'viewHotelModal'+name" variant="info"> More Details </b-button>

    <b-modal 
        :id="'viewHotelModal'+name" 
        :title="name"
        ok-only
        ok-title="Close"
        > 

        <hotel-modal
        :starRating="starRating"
        :address="address"
        > </hotel-modal>
        
      </b-modal>
  </b-list-group-item> 
</template>

<script>
import HotelModal from './HotelModal.vue'

export default {
  components: { HotelModal },
  name: 'HotelListItem',
  props: {
    name: {
      type: String
    }, 
    nightlyRate: {
      type: String
    }, 
    starRating: {
      type: Number
    }, 
    address: {
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
