<template>
  <table v-if="!loading">
    <tr>
      <th>Index</th>
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
      <td>{{ index + (currentPage - 1) * 100 + 1 }}</td>
      <td>{{ product.name }}</td>
      <td>{{ product.id }}</td>
      <td>{{ product.manufacturer }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.color }}</td>
      <!-- <BaseAvailability
          :id="product.id"
          :manufacturer="product.manufacturer"
        /> -->
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    currentPage: {
      type: Number,
      require: true,
    },
    loading: {
      type: Boolean,
      require: true,
    },
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
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