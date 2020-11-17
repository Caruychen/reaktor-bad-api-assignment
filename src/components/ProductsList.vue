<template>
  <div>
    <ProductsPagination :category="category" @updatePage="updatePage" />
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
      <tr
        v-for="product in getProducts(category, currentPage)"
        :key="product.index"
      >
        <td>{{ product.index }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.manufacturer }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.color }}</td>
        <BaseAvailability
          :manufacturer="product.manufacturer"
          :id="product.id"
          :isLoaded="manufacturerIsLoaded[product.manufacturer]"
        />
      </tr>
    </table>
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
      currentPage: 1
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    }
  },
  components: {
    BaseAvailability,
    ProductsFilter,
    ProductsPagination
  },
  computed: {
    ...mapGetters("products", ["getProducts", "getUniqueSet"]),
    ...mapState(["availability"]),
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
    updateFilter: function (searchInputs) {
      console.log(searchInputs);
    },
    updatePage: function (newPage) {
      this.currentPage = newPage;
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
</style>