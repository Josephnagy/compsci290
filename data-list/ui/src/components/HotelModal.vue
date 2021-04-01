<template>
  <div> 
      <div> 
          <h6> Star Rating </h6>
          <span> {{starRating}}/5 Stars </span>
      </div>
      <br> 
      <div> 
          <h6> Address </h6>
          <span> {{streetAddress}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HotelModal',
  props: {
    starRating: {
      type: Number
    }, 
    address: {
        type: Object
    }
  }, 
  computed: {
      streetAddress() {
          return (this.address.streetAddress) ? this.address.streetAddress : "No Street Address Available";
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
