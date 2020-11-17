<template>
  <div class="page-selector">
    <button @click="decrementPage" type="button">Prev</button>
    <label for="page">Page</label>
    <input
      id="page"
      name="page"
      type="number"
      v-model.number="currentPage"
      step="1"
      min="1"
      :max="getPages(category)"
    />
    <label for="page">of {{ getPages(category) }}</label>
    <button @click="incrementPage" type="button">Next</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    pageProxy: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters("products", ["getPages"]),
    currentPage: {
      get() {
        return this.pageProxy;
      },
      set(page) {
        if (page) this.$emit("updatePage", this.clampPages(page));
      },
    },
  },
  methods: {
    incrementPage: function () {
      this.currentPage++;
    },
    decrementPage: function () {
      this.currentPage--;
    },
    clampPages: function(newPage) {
      const maxPages = this.getPages(this.category);
      return Math.min(Math.max(newPage, 1), maxPages);
    }
  }
};
</script>

<style scoped>
.page-selector {
  margin-bottom: 1rem;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
  text-align: center;
  margin: 0 5px;
}
button {
  margin: 0 1rem;
}
</style>