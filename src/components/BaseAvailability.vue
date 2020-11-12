<template>
  <td :class="availability.toString().toLowerCase()">{{ availability }}</td>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    manufacturer: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters("availability", ["getAvailability"]),
    availability: function () {
      return this.status
        ? this.getAvailability(this.manufacturer, this.id)
        : "loading...";
    }
  }
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