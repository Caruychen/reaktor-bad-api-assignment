export default {
  namespaced: true,
  state: {
    jackets: { items: null, isFetching: false, fetchCall: null },
    shirts: { items: null, isFetching: false, fetchCall: null },
    accessories: { items: null, isFetching: false, fetchCall: null }
  },
  getters: {
    getFilteredProducts: (state, getters, rootState, rootGetters) => (category, search) => {
      return state[category].items.filter(product => {
        const filteredProducts = Object.entries(product).every(currentProperty => {
          const searchTerm = search[currentProperty[0]];
          return searchTerm
            ? currentProperty[1].toString().includes(searchTerm)
            : true;
          // if (!searchTerm) return true
          // if (currentProperty[1].toString().includes(searchTerm)) return true
          // return false
        })
        const availabilityFilter = search.availability 
          ? rootGetters["availability/getAvailability"](product.manufacturer, product.id).includes(search.availability)
          : true;
        return filteredProducts && availabilityFilter
      })
    },
    getUniqueSet: state => (category, column) => {
      return [...new Set(state[category].items.map(item => item[column]).flat())]
    },
    getFilteredUniqueSet: (state, getters) => (category, column, searchInput, maxOptions) => {
      const searchTerm = searchInput.toString();
      return getters.getUniqueSet(category, column)
        .filter(item => {
          return typeof item !== "number" && item.includes(searchTerm)
        })
        .slice(0, maxOptions)
    }
  }
}