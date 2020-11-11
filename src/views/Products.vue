<template>
  <div>
    <h1>{{ category }}</h1>
    <table v-if="!loading">
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Manufacturer</th>
        <th>Price</th>
        <th>Color</th>
        <th>Availability</th>
      </tr>
      <tr v-for="(product, index) in getProducts(category)" :key="index">
        <td>{{ product.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.manufacturer }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.color }}</td>
        <BaseAvailability :id="product.id" :manufacturer="product.manufacturer" />
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
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseAvailability
  },
  watch: {
    category() {
      this.loadProductData();
    },
  },
  computed: {
    ...mapGetters(["getProducts"]),
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    loadProductData: async function () {
      this.loading = true;
      await this.fetchProducts(this.category);
      this.loading = false;
    },
  },
  created() {
    this.loadProductData();
  },
};
</script>