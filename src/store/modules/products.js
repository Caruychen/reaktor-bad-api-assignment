import { badApiHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    products: {
      jackets: null,
      shirts: null,
      accessories: null
    }
  },
  getters: {
    getProducts: state => (category, page) => {
      const minIndex = (page - 1) * 100
      const maxIndex = page * 100;
      return state.products[category].map(item => {
        return {
          name: item.name,
          id: item.id,
          manufacturer: item.manufacturer,
          price: item.price,
          color: item.color.join(', ')
        }
      }).slice(minIndex, maxIndex);
    },
    getPages: state => category => {
      return Math.ceil(state.products[category].length / 100);
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products[payload.category] = payload.data;
    }
  },
  actions: {
    fetchProducts: async ({ state, commit }, category) => {
      if (!state.products[category]) {
        const products = await badApiHTTP.get("products/" + category);
        if (products.status === 200) {
          commit("setProducts", {
            data: products.data,
            category
          })
        }
      }
    }
  }
}