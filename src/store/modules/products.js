import { badApiHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    jackets: { items: null, isFetching: false, fetchCall: null },
    shirts: { items: null, isFetching: false, fetchCall: null },
    accessories: { items: null, isFetching: false, fetchCall: null }
  },
  getters: {
    getProducts: state => (category, page) => {
      const minIndex = (page - 1) * 100
      const maxIndex = page * 100;
      return state[category].items.map((item, index) => {
        return {
          index: index + 1,
          name: item.name,
          id: item.id,
          manufacturer: item.manufacturer,
          price: item.price,
          color: item.color.join(', ')
        }
      }).slice(minIndex, maxIndex);
    },
    getPages: state => category => {
      return Math.ceil(state[category].items.length / 100);
    },
    getManufacturerSet: state => (category) => {
      const distinctManufacturers = [...new Set(state[category].items.map(item => item.manufacturer))]
      return distinctManufacturers;
    }
  },
  mutations: {
    setProductData(state, payload) {
      state[payload.category].items = payload.data
    },
    setProductIsFetching(state, payload) {
      state[payload.category].isFetching = payload.isFetching;
    },
    setProductCall(state, payload) {
      state[payload.category].fetchCall = payload.productCall;
    }
  },
  actions: {
    fetchProducts: ({ state, commit, dispatch }, category) => {
      const productData = state[category]
      if (productData.isFetching) {
        return productData.fetchCall
      }
      commit("setProductIsFetching", { category, isFetching: true })
      const productCall = dispatch("productCall", category);
      commit("setProductCall", {
        category,
        productCall
      })
      return productCall
    },
    productCall: async ({ commit }, category) => {
      const products = await badApiHTTP.get("products/" + category);
      if (products.status === 200) {
        commit("setProductData", {
          data: products.data,
          category
        })
      }
      commit("setProductIsFetching", { category, isFetching: false })
      commit("setProductCall", {
        category,
        productCall: false
      });
      return Promise.resolve(category);
    }
  }
}