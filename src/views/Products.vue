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
      </tr>
      <tr v-for="(product, index) in showProductList" :key="index">
        <td>{{ product.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.manufacturer }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.color[0] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      productData: null
    }
  },
  props: {
    category: {
      type: String,
      required: true,
    }
  },
  computed: {
    showProductList: function() {
      return this.productData.slice(0, 99);
    }
  },
  methods: {
    fetchProducts: async function() {
      this.loading = true
      const products = await axios.get("https://bad-api-assignment.reaktor.com/products/" + this.category)
      this.productData = products.data
      this.loading = false
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>