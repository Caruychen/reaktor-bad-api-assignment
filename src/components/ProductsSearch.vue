<template>
  <tr id="products-search">
    <ProductsSearchInput
      v-for="input in inputsArray"
      :key="input.column"
      :category="category"
      :column="input.column"
      :maxOptions="input.maxOptions"
      :availabilityLoadStatus="input.availabilityLoadStatus"
      @searchInput="collateInputs"
    />
  </tr>
</template>

<script>
import ProductsSearchInput from "@/components/ProductsSearchInput.vue";

export default {
  data() {
    return {
      inputsArray: [
        { column: "name", maxOptions: 50 },
        { column: "id", maxOptions: 50 },
        { column: "manufacturer" },
        { column: "price" },
        { column: "color" },
        {
          column: "availability",
          availabilityLoadStatus: this.manufacturerLoadStatuses,
        },
      ],
    };
  },
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
      this.$emit("updateSearch", column, searchInput);
    },
  },
};
</script>