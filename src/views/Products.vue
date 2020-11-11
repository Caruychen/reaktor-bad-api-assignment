<template>
  <div id="products">
    <h1>{{ category | capitalize }}</h1>
    <div v-if="!loading" class="pages">
      <label for="page">Total pages: {{ getPages(category) }}</label>
      <button @click="decrementPage(category)" type="button">Prev</button>
      <input
        id="page"
        name="page"
        type="number"
        v-model.number="currentPage"
        step="1"
        min="1"
        :max="getPages(category)"
      />
      <button @click="incrementPage(category)" type="button">Next</button>
    </div>
    <table v-if="!loading">
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Manufacturer</th>
        <th>Price</th>
        <th>Color</th>
        <th>Availability</th>
      </tr>
      <tr
        v-for="(product, index) in getProducts(category, currentPage)"
        :key="index"
      >
        <td>{{ product.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.manufacturer }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.color }}</td>
        <BaseAvailability
          :id="product.id"
          :manufacturer="product.manufacturer"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseAvailability from "@/components/BaseAvailability.vue";

export default {
  data() {
    return {
      loading: false,
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
    BaseAvailability,
  },
  watch: {
    category() {
      this.loadProductData();
    },
  },
  computed: {
    ...mapGetters("products", ["getProducts", "getPages"]),
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
            this.pageProxy[this.category] = page
          }
        }
      }
    },
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
    loadProductData: async function () {
      this.loading = true;
      await this.fetchProducts(this.category);
      this.loading = false;
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
table {
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #444;
  color: white;
}
table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}
label {
  display: block;
}
</style>