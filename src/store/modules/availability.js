import { badApiHTTP } from "@/service/index.js";

export default {
  namespaced: true,
  state: {
    availability: {}
  },
  getters: {
    getAvailability: state => (manufacturer, id) => {
      return state.availability[manufacturer].items.find(item => {
        return item.id.toLowerCase() === id
      })
        .DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/)[1];
    }
  },
  mutations: {
    initAvailabilityManufacturer(state, manufacturer) {
      state.availability[manufacturer] = {
        items: null,
        isFetching: true,
        fetchCall: null
      }
    },
    setAvailabilityData(state, payload) {
      state.availability[payload.manufacturer].items = payload.data
    },
    setAvailabilityIsFetching(state, payload) {
      state.availability[payload.manufacturer].isFetching = payload.isFetching;
    },
    setAvailabilityCall(state, payload) {
      state.availability[payload.manufacturer].fetchCall = payload.availabilityCall;
    }
  },
  actions: {
    fetchAvailability: ({ state, commit, dispatch }, manufacturer) => {
      const manufacturerData = state.availability[manufacturer];
      if (!manufacturerData) {
        commit("initAvailabilityManufacturer", manufacturer); // Initialize new manufacturer object if not found in state
      } else {
        if (manufacturerData.isFetching) {
          return manufacturerData.fetchCall; // Return Promise object from state if already fetching
        }
        commit("setAvailabilityIsFetching", { manufacturer, isFetching: true });
      }
      const availabilityCall = dispatch("availabilityCall", manufacturer);
      // set the fetch request promise object to the associated manufacturer item
      commit("setAvailabilityCall", {
        manufacturer,
        availabilityCall
      });
      return availabilityCall;
    },
    availabilityCall: async ({ state, commit }, manufacturer) => {
      const items = state.availability[manufacturer].items;
      if (!items || items.length <= 0) {
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