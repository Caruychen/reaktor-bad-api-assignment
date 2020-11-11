import axios from "axios";

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
    getProducts: (state) => category => {
      return state.products[category].map(item => {
        return {
          name: item.name,
          id: item.id,
          manufacturer: item.manufacturer,
          price: item.price,
          color: item.color.join(', ')
        }
      }).slice(0, 99);
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
        const products = await axios.get("https://bad-api-assignment.reaktor.com/products/" + category);
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