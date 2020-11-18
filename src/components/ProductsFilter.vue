<template>
  <tr id="products-filter">
    <ProductsFilterInput
      :category="category"
      @searchInput="collateInputs"
      column="name"
      :maxOptions="50"
    />
    <ProductsFilterInput
      :category="category"
      @searchInput="collateInputs"
      column="id"
      :maxOptions="50"
    />
    <ProductsFilterInput
      :category="category"
      @searchInput="collateInputs"
      column="manufacturer"
    />
    <ProductsFilterInput
      :category="category"
      @searchInput="collateInputs"
      column="price"
    />
    <ProductsFilterInput
      :category="category"
      @searchInput="collateInputs"
      column="color"
    />
    <ProductsFilterInput
      :category="category"
      @searchInput="collateInputs"
      column="availability"
      :availabilityLoadStatus="manufacturerLoadStatuses"
    />
  </tr>
</template>

<script>
import ProductsFilterInput from "@/components/ProductsFilterInput.vue";

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
    ProductsFilterInput,
  },
  methods: {
    collateInputs: function (column, searchInput) {
      this.$emit("updateFilter", column, searchInput);
    },
  },
};
</script>