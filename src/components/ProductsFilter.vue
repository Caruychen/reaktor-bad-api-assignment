<template>
  <tr id="products-filter">
    <td></td>
    <ProductsFilterInput :category="category" column="name" :maxOptions="50" />
    <ProductsFilterInput :category="category" column="id" :maxOptions="50" />
    <ProductsFilterInput :category="category" column="manufacturer"/>
    <ProductsFilterInput :category="category" column="price"/>
    <ProductsFilterInput :category="category" column="color"/>
    <td id="filter-availability"></td>
  </tr>
</template>

<script>
import ProductsFilterInput from "@/components/ProductsFilterInput.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      nameSearch: "",
      idSearch: "",
      manufacturerSearch: "",
      priceSearch: "",
      colorSearch: "",
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  components: {
    ProductsFilterInput
  },
  computed: {
    ...mapGetters("products", ["getUniqueSet", "getFilteredUniqueSet"]),
  }
};
</script>