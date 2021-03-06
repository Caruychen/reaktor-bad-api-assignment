export default {
  namespaced: true,
  state: {},
  getters: {
    getAvailability: state => (manufacturer, id) => {
      if (!state[manufacturer].items) return "DATA NOT FOUND";
      return state[manufacturer].items.find(item => {
        return item.id.toLowerCase() === id;
      }).DATAPAYLOAD.match(/INSTOCKVALUE>(\w*?)<\/INSTOCKVALUE/)[1];
    },
    getAvailabilitySet: (state, getters, rootState) => (category) => {
      return [... new Set(rootState.products[category].items.map(item => {
        return getters.getAvailability(item.manufacturer, item.id);
      }))]
    }
  }
}