<template>
  <div class="products-pagination">
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
        return this.pageProxy;
      },
      set(page) {
        if (page) this.$emit("updatePage", page);
      },
    },
  },
  methods: {
    incrementPage: function () {
      this.currentPage++;
    },
    decrementPage: function () {
      this.currentPage--;
    }
  }
};
</script>

<style scoped>
.products-pagination {
  margin: 1rem auto;
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
  cursor: pointer;
}
</style>