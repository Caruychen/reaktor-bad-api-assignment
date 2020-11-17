<template>
  <div class="page-selector">
    <button @click="decrementPage(category)" type="button">Prev</button>
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
    <button @click="incrementPage(category)" type="button">Next</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      pageProxy: {
        jackets: 1,
        shirts: 1,
        accessories: 1,
      },
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  watch: {
    currentPage() {
      this.$emit("updatePage", this.currentPage);
    },
  },
  computed: {
    ...mapGetters("products", ["getPages"]),
    currentPage: {
      get() {
        return this.pageProxy[this.category];
      },
      set(page) {
        if (page) {
          if (page < 1) {
            this.pageProxy[this.category] = 1;
          } else if (page > this.getPages(this.category)) {
            this.pageProxy[this.category] = this.getPages(this.category);
          } else {
            this.pageProxy[this.category] = page;
          }
        }
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
  },
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