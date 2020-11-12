import { badApiHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {},
  getters: {
    getAvailability: state => (manufacturer, id) => {
      return state[manufacturer].items.find(item => {
        return item.id.toLowerCase() === id
      })
        .DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/)[1];
    },
    loaded: state => manufacturer => {
      return state[manufacturer].items ? true : false;
    }
  },
  mutations: {
    initAvailabilityManufacturer(state, manufacturer) {
      if (!state[manufacturer]) {
        state[manufacturer] = {
          items: null,
          isFetching: false,
          fetchCall: null
        }
      }
    },
    setAvailabilityData(state, payload) {
      state[payload.manufacturer].items = payload.data
    },
    setAvailabilityIsFetching(state, payload) {
      state[payload.manufacturer].isFetching = payload.isFetching;
    },
    setAvailabilityCall(state, payload) {
      state[payload.manufacturer].fetchCall = payload.availabilityCall;
    }
  },
  actions: {
    fetchAvailability: ({ state, commit, dispatch }, manufacturer) => {
      const manufacturerData = state[manufacturer];
      if (manufacturerData.isFetching) {
        return manufacturerData.fetchCall;
      }
      commit("setAvailabilityIsFetching", { manufacturer, isFetching: true });
      const availabilityCall = dispatch("availabilityCall", manufacturer);
      // set the fetch request promise object to the associated manufacturer item
      commit("setAvailabilityCall", {
        manufacturer,
        availabilityCall
      });
      return availabilityCall;
    },
    availabilityCall: async ({ state, commit }, manufacturer) => {
      const items = state[manufacturer].items;
      if (!items) {
        const availability = await badApiHTTP.get("availability/" + manufacturer);
        if (availability.status === 200) {
          commit("setAvailabilityData", {
            data: availability.data.response,
            manufacturer
          })
        }
      }
      commit("setAvailabilityIsFetching", { manufacturer, isFetching: false });
      commit("setAvailabilityCall", {
        manufacturer,
        availabilityCall: null
      });
      return Promise.resolve(true);
    }
  }
}