<template>
  <td class="loading-data" v-if="loading">loading...</td>
  <td :class="getAvailability(manufacturer, id).toLowerCase() " v-else>{{ getAvailability(manufacturer, id) }}</td>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    manufacturer: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters("availability", ["getAvailability"])
  },
  methods: {
    ...mapActions("availability", ["fetchAvailability"]),
    loadAvailability: async function() {
      this.loading = true;
      await this.fetchAvailability(this.manufacturer);
      this.loading = false;
    }
  },
  created() {
    this.loadAvailability();
  }
};
</script>

<style scoped>
.loading-data {
  opacity: 0.8;
}
.instock {
  background-color: rgba(144, 238, 144, 0.5)
}
.lessthan10 {
  background-color: rgba(255, 255, 0, 0.7);
}
.outofstock {
  background-color: rgba(255, 0, 0, 0.7);
}
</style>