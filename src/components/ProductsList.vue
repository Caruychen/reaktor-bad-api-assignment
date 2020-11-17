<template>
  <div>
    <ProductsPagination
      :category="category"
      :pageProxy="pageProxy[category]"
      :maxPages="products.maxPages"
      @updatePage="updatePage"
    />
    <table id="products-list">
      <tr>
        <th>Index</th>
        <th>Name</th>
        <th>ID</th>
        <th>Manufacturer</th>
        <th>Price</th>
        <th>Color</th>
        <th>Availability</th>
      </tr>
      <ProductsFilter
        :category="category"
        :loadStatus="manufacturerIsLoaded"
        @updateFilter="updateFilter"
      />
      <tr v-for="product in products.list" :key="product.index">
        <td>{{ product.index }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.manufacturer }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.color.join(", ") }}</td>
        <BaseAvailability
          :manufacturer="product.manufacturer"
          :id="product.id"
          :isLoaded="manufacturerIsLoaded[product.manufacturer]"
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
import ProductsFilter from "@/components/ProductsFilter.vue";
import ProductsPagination from "@/components/ProductsPagination.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      manufacturerIsLoaded: {},
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
    ProductsFilter,
    ProductsPagination,
  },
  computed: {
    ...mapGetters("products", [
      "getProducts",
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
      const page = this.pageProxy[this.category];
      const minIndex = (page - 1) * 100;
      const maxIndex = page * 100;
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
        if (!this.availability[manufacturer]) {
          this.initAvailabilityManufacturer(manufacturer);
        }
        this.$set(this.manufacturerIsLoaded, manufacturer, false);
        if (!this.availability[manufacturer].items) {
          await this.fetchAvailability(manufacturer);
        }
        this.manufacturerIsLoaded[manufacturer] = true;
        this.timer[manufacturer] = this.setFetchInterval(manufacturer);
      });
    },
    setFetchInterval: function (manufacturer) {
      // Background refresh availability data in 5 minute intervals
      return setInterval(async () => {
        this.manufacturerIsLoaded[manufacturer] = false;
        await this.fetchAvailability(manufacturer);
        this.manufacturerIsLoaded[manufacturer] = true;
      }, 300000);
    },
    fetchAvailability: function (manufacturer) {
      return this.fetchData({
        module: "availability",
        type: manufacturer,
      });
    },
    updateFilter: function (column, searchInput) {
      this.$set(this.search, column, searchInput);
    },
    updatePage: function (newPage) {
      this.pageProxy[this.category] = newPage;
    },
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
</style>