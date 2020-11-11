import axios from "axios";

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
    setAvailability(state, payload) {
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
      if (manufacturerData) {
        if (manufacturerData.isFetching) {
          return manufacturerData.fetchCall; // Return Promise object from state if already fetching
        }
        commit("setAvailabilityIsFetching", { manufacturer, isFetching: true });
      } else {
        commit("initAvailabilityManufacturer", manufacturer); // Initialize new manufacturer if not found in state
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
      if (!state.availability[manufacturer].items) {
        const availability = await axios.get("https://bad-api-assignment.reaktor.com/availability/" + manufacturer);
        if (availability.status === 200) {
          commit("setAvailability", {
            data: availability.data.response,
            manufacturer
          })
        }
        commit("setAvailabilityIsFetching", { manufacturer, isFetching: false });
        commit("setAvailabilityCall", {
          manufacturer,
          availabilityCall: null
        });
      }
      return Promise.resolve(true);
    }
  }
}