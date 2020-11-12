import { badApiHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    jackets: null,
    shirts: null,
    accessories: null
  },
  getters: {
    getProducts: state => (category, page) => {
      const minIndex = (page - 1) * 100
      const maxIndex = page * 100;
      return state[category].map(item => {
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
      return Math.ceil(state[category].length / 100);
    },
    getManufacturerSet: state => (category) => {
      const distinctManufacturers = [...new Set(state[category].map(item => item.manufacturer))]
      return distinctManufacturers;
    }
  },
  mutations: {
    setProducts(state, payload) {
      state[payload.category] = payload.data;
    }
  },
  actions: {
    fetchProducts: async ({ commit }, category) => {
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