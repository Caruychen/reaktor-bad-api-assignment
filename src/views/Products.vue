<template>
  <div id="products">
    <h1>{{ category | capitalize }}</h1>
    <keep-alive>
      <ProductsList v-if="loadStatus[category]" :category="category" />
    </keep-alive>
  </div>
</template>

<script>
import ProductsList from "@/components/ProductsList.vue";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loadStatus: {
        jackets: false,
        shirts: false,
        accessories: false,
      },
    };
  },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  components: {
    ProductsList,
  },
  computed: {
    ...mapState(["products"]),
  },
  watch: {
    category() {
      this.loadProductData(this.category);
    },
  },
  methods: {
    ...mapActions(["fetchData"]),
    loadProductData: async function (category) {
      this.loadStatus[category] =
        !!this.products[category].items ||
        !!(await this.fetchData({
          module: "products",
          type: category,
        }));
    },
  },
  created() {
    this.loadProductData(this.category);
  },
};
</script>

<style scoped>
#products {
  margin: 5rem auto;
}
</style>