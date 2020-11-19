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
      this.loadProductData();
    },
  },
  methods: {
    ...mapActions(["fetchData"]),
    loadProductData: async function () {
      this.loadStatus[this.category] =
        !!this.products[this.category].items ||
        !!(await this.fetchData({
          module: "products",
          type: this.category,
        }));
    },
  },
  created() {
    this.loadProductData();
  },
};
</script>

<style scoped>
#products {
  margin: 5rem auto;
}
</style>