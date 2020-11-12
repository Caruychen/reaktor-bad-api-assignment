import Vue from "vue";
import Vuex from "vuex";
import products from "./modules/products";
import availability from "./modules/availability";
import { badApiHTTP } from "@/service/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    setData(state, payload) {
      state[payload.module][payload.type].items = payload.data
    },
    setIsFetching(state, payload) {
      state[payload.module][payload.type].isFetching = payload.isFetching;
    },
    setCall(state, payload) {
      state[payload.module][payload.type].fetchCall = payload.call;
    }
  },
  actions: {
    fetchData: ({ state, commit, dispatch }, { module, type }) => {
      const data = state[module][type]
      if (data.isFetching) {
        return data.fetchCall
      }
      commit("setIsFetching", { module, type, isFetching: true })
      const call = dispatch("callback", { module, type });
      commit("setCall", {
        module,
        type,
        call
      })
      return call
    },
    callback: async ({ commit }, { module, type }) => {
      const response = await badApiHTTP.get(`${module}/${type}`);
      if (response.status === 200) {
        commit("setData", {
          module,
          type,
          data: response.data.response || response.data
        })
      }
      commit("setIsFetching", { module, type, isFetching: false })
      commit("setCall", {
        module,
        type,
        call: false
      });
      return Promise.resolve(type);
    }
  },
  modules: {
    products,
    availability
  }
});
