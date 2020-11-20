<template>
  <td :class="availability.toLowerCase()">{{ availability }}</td>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: {
    manufacturer: {
      type: String,
      required: true,
    },
    productID: {
      type: String,
      required: true,
    },
    isLoaded: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState({ availabilityState: "availability" }),
    ...mapGetters("availability", ["getAvailability"]),
    availability: function () {
      /* 
        * isLoaded switches in during each 5 minute data refresh
        * continues displaying previous data until refresh is completed.
      */
      const isManufacturerExists = !!this.availabilityState[this.manufacturer].items;
      return this.isLoaded
        ? this.getAvailability(this.manufacturer, this.productID)
        : isManufacturerExists
          ? this.getAvailability(this.manufacturer, this.productID)
          : "loading...";
    },
  },
};
</script>

<style scoped>
.loading {
  opacity: 0.8;
}
.instock {
  background-color: rgba(144, 238, 144, 0.5);
}
.lessthan10 {
  background-color: rgba(255, 255, 0, 0.7);
}
.outofstock {
  background-color: rgba(255, 0, 0, 0.7);
}
</style>