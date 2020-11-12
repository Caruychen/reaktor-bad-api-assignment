<template>
  <div id="products">
    <h1>{{ category | capitalize }}</h1>
    <div v-if="loadStatus[category]" class="page-selector">
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
    <BaseListTable
      v-if="loadStatus[category]"
      :category="category"
      :currentPage="currentPage"
    />
  </div>
</template>

<script>
import BaseListTable from "@/components/BaseListTable.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loadStatus: {
        jackets: false,
        shirts: false,
        accessories: false,
      },
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
  components: {
    BaseListTable,
  },
  watch: {
    category() {
      this.loadProductData();
    },
  },
  computed: {
    ...mapState(["products"]),
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
    ...mapActions(["fetchData"]),
    loadProductData: async function () {
      if (!this.products[this.category].items) {
        this.loadStatus[this.category] = false;
        const fetchedCategory = await this.fetchData({
          module: "products",
          type: this.category,
        });
        this.loadStatus[fetchedCategory] = true;
      }
    },
    incrementPage: function (category) {
      if (this.pageProxy[category] < this.getPages(this.category))
        this.pageProxy[category]++;
    },
    decrementPage: function (category) {
      if (this.pageProxy[category] > 1) this.pageProxy[category]--;
    },
  },
  created() {
    this.loadProductData();
  },
};
</script>

<style scoped>
#products {
  margin: 5rem auto;
}

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