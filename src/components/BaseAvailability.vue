<template>
  <td v-if="!loading">{{ getAvailability(manufacturer, id) }}</td>
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