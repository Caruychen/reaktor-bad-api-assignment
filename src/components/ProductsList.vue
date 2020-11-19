<template>
  <div id="products-list">
    <ProductsPagination
      :category="category"
      :pageProxy="pageProxy[category]"
      :maxPages="products.maxPages"
      @updatePage="updatePage"
    />
    <button @click="clearSearch">Clear Search</button>
    <table>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Manufacturer</th>
        <th>Price</th>
        <th>Color</th>
        <th>Availability</th>
      </tr>
      <ProductsSearch
        ref="search"
        :category="category"
        :manufacturerLoadStatuses="manufacturerLoadStatuses"
        @updateSearch="updateSearch"
      />
      <tr v-for="(product, index) in products.list" :key="index">
        <td>{{ product.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.manufacturer }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.color.join(", ") }}</td>
        <BaseAvailability
          :manufacturer="product.manufacturer"
          :productID="product.id"
          :isLoaded="manufacturerLoadStatuses[product.manufacturer]"
        />
      </tr>
    </table>
    <ProductsPagination
      :category="category"
      :pageProxy="pageProxy[category]"
      :maxPages="products.maxPages"
      @updatePage="updatePage"
    />
  </div>
</template>

<script>
import BaseAvailability from "@/components/BaseAvailability.vue";
import ProductsSearch from "@/components/ProductsSearch.vue";
import ProductsPagination from "@/components/ProductsPagination.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      manufacturerLoadStatuses: {},
      timer: {},
      pageProxy: {
        jackets: 1,
        shirts: 1,
        accessories: 1,
      },
      search: {},
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
    ProductsSearch,
    ProductsPagination,
  },
  computed: {
    ...mapGetters("products", [
      "getUniqueSet",
      "getFilteredProducts",
    ]),
    ...mapState(["availability"]),
    products: function () {
      const products = this.getFilteredProducts(
        this.category,
        this.search
      );
      const maxPages = Math.ceil(products.length / 100);
      this.updatePage(Math.min(Math.max(this.pageProxy[this.category], 1), maxPages))
      const minIndex = (this.pageProxy[this.category] - 1) * 100;
      const maxIndex = this.pageProxy[this.category] * 100;
      return {
        list: products.slice(minIndex, maxIndex),
        maxPages
      }
    },
  },
  methods: {
    ...mapActions(["fetchData"]),
    ...mapMutations(["initAvailabilityManufacturer"]),
    loadFetchSequence: function () {
      const manufacturers = this.getUniqueSet(this.category, "manufacturer");
      manufacturers.forEach(async (manufacturer) => {
        // Initialise manufacturer state data if first time fetching
        if (!this.availability[manufacturer]) {
          this.initAvailabilityManufacturer(manufacturer);
        }
        this.$set(this.manufacturerLoadStatuses, manufacturer, false);

        // Fetch manufacturer data if absent, and set refresh interval
        if (!this.availability[manufacturer].items) {
          await this.fetchAvailability(manufacturer);
        }
        this.manufacturerLoadStatuses[manufacturer] = true;
        this.timer[manufacturer] = this.setFetchInterval(manufacturer);
      });
    },
    setFetchInterval: function (manufacturer) {
      // Background refresh availability data in 5 minute intervals
      return setInterval(async () => {
        this.manufacturerLoadStatuses[manufacturer] = false;
        await this.fetchAvailability(manufacturer);
        this.manufacturerLoadStatuses[manufacturer] = true;
      }, 300000);
    },
    fetchAvailability: function (manufacturer) {
      return this.fetchData({
        module: "availability",
        type: manufacturer,
      });
    },
    updateSearch: function (column, searchInput) {
      this.$set(this.search, column, searchInput);
    },
    updatePage: function (newPage) {
      this.pageProxy[this.category] = newPage;
    },
    clearSearch: function() {
      this.$refs.search.$children.forEach(child => child.search = "")
    }
  },
  created() {
    this.loadFetchSequence();
  },
  beforeDestroy() {
    for (const key of Object.entries(this.timer)) {
      clearInterval(this.timer[key[0]]);
    }
  },
};
</script>

<style scoped>
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

button {
  margin: 5px auto;
  cursor: pointer;
}
</style>