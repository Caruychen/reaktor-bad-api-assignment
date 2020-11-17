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
      :max="maxPages"
    />
    <label for="page">of {{ maxPages }}</label>
    <button @click="incrementPage" type="button">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    pageProxy: {
      type: Number,
      required: true
    },
    maxPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.clampPages(this.pageProxy);
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
      return Math.min(Math.max(newPage, 1), this.maxPages);
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