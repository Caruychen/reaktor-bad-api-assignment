<template>
  <tr id="products-filter">
    <ProductsSearchInput
      :category="category"
      @searchInput="collateInputs"
      column="name"
      :maxOptions="50"
    />
    <ProductsSearchInput
      :category="category"
      @searchInput="collateInputs"
      column="id"
      :maxOptions="50"
    />
    <ProductsSearchInput
      :category="category"
      @searchInput="collateInputs"
      column="manufacturer"
    />
    <ProductsSearchInput
      :category="category"
      @searchInput="collateInputs"
      column="price"
    />
    <ProductsSearchInput
      :category="category"
      @searchInput="collateInputs"
      column="color"
    />
    <ProductsSearchInput
      :category="category"
      @searchInput="collateInputs"
      column="availability"
      :availabilityLoadStatus="manufacturerLoadStatuses"
    />
  </tr>
</template>

<script>
import ProductsSearchInput from "@/components/ProductsSearchInput.vue";

export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    manufacturerLoadStatuses: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProductsSearchInput,
  },
  methods: {
    collateInputs: function (column, searchInput) {
      this.$emit("updateFilter", column, searchInput);
    },
  },
};
</script>