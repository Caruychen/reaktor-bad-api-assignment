<template>
  <div id="products-list">
    <ProductsPagination
      :category="category"
      :pageProxy="currentPage"
      :maxPages="maxPages"
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
      <tr v-for="(product, index) in productsSubArray" :key="index">
        <td>{{ product.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.manufacturer }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.color.join(", ") }}</td>
        <Availability
          :manufacturer="product.manufacturer"
          :productID="product.id"
          :isLoaded="manufacturerLoadStatuses[product.manufacturer]"
        />
      </tr>
    </table>
    <ProductsPagination
      :category="category"
      :pageProxy="currentPage"
      :maxPages="maxPages"
      @updatePage="updatePage"
    />
  </div>
</template>

<script>
import Availability from "@/components/Availability.vue";
import ProductsSearch from "@/components/ProductsSearch.vue";
import ProductsPagination from "@/components/ProductsPagination.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      manufacturerLoadStatuses: {},
      timer: {},
      pageProxy: 1,
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
    Availability,
    ProductsSearch,
    ProductsPagination,
  },
  computed: {
    ...mapGetters("products", ["getUniqueSet", "getFilteredProducts"]),
    ...mapState(["availability"]),
    maxPages: function () {
      return Math.ceil(this[this.category].length / 100);
    },
    productsSubArray: function () {
      // Ensures currentPage is re-assigned within range
      this.updatePage(this.currentPage);
      const minIndex = (this.currentPage - 1) * 100;
      const maxIndex = this.currentPage * 100;
      return this[this.category].slice(minIndex, maxIndex);
    },
    currentPage: {
      get() {
        return this.pageProxy;
      },
      set(newPage) {
        this.pageProxy = Math.min(Math.max(newPage, 1), this.maxPages);
      },
    },
  },
  methods: {
    ...mapActions(["fetchData"]),
    ...mapMutations(["initAvailabilityManufacturer"]),
    loadFetchSequence: function () {
      const manufacturers = this.getUniqueSet(this.category, "manufacturer");
      /*
       * Fetch sequence initiates manufacturer state data and sets
       * a 5 minute interval for re-fetching manufacturer data to
       * keep a live track of changes to product availability.
       */
      manufacturers.forEach(async (manufacturer) => {
        if (!(manufacturer in this.availability)) {
          this.initAvailabilityManufacturer(manufacturer);
        }

        this.$set(this.manufacturerLoadStatuses, manufacturer, false);
        if (!this.availability[manufacturer].items) {
          await this.fetchAvailability(manufacturer);
        }
        this.manufacturerLoadStatuses[manufacturer] = true;
        this.timer[manufacturer] = this.setFetchInterval(manufacturer);
      });
    },
    setFetchInterval: function (manufacturer) {
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
      column in this.search
        ? (this.search[column] = searchInput)
        : this.$set(this.search, column, searchInput);
    },
    clearSearch: function () {
      this.$refs.search.$children.forEach((child) => (child.search = ""));
    },
    updatePage: function (newPage) {
      this.currentPage = newPage;
    },
  },
  beforeCreate() {
    /*
     * Create separate computed properties for each category
     * Results to current search inputs cached to allow quick page changes.
     * Executed before dependent computed properties are set up.
     */
    const keys = ["jackets", "shirts", "accessories"];
    keys.forEach((key) => {
      this.$options.computed[key] = function () {
        return this.getFilteredProducts(key, this.search);
      };
    });
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