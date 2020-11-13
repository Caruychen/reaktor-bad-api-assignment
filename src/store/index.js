import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import products from "./modules/products";
import availability from "./modules/availability";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations,
  actions,
  modules: {
    products,
    availability
  }
});
