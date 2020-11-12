export default {
  namespaced: true,
  state: {},
  getters: {
    getAvailability: state => (manufacturer, id) => {
      return state[manufacturer].items.find(item => {
        return item.id.toLowerCase() === id
      })
        .DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/)[1];
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
    }
  }
}