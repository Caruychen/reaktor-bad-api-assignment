import { parseLogic } from "@/store/helpers/helpers.js";

export default {
  namespaced: true,
  state: {
    jackets: { items: null, isFetching: false, fetchCall: null },
    shirts: { items: null, isFetching: false, fetchCall: null },
    accessories: { items: null, isFetching: false, fetchCall: null }
  },
  getters: {
    getFilteredProducts: (state, getters, rootState, rootGetters) => (category, search) => {
      // Avoid filtering with empty search inputs
      if (Object.values(search).every(value => value === undefined || value === "")) {
        return state[category].items
      }
      return state[category].items.filter(product => {
        const filteredProducts = Object.entries(product).every(currentProperty => {
          const searchTerm = search[currentProperty[0]];
          const value = currentProperty[1];
          if (!searchTerm) return true
          return currentProperty[0] === "price"
            ? parseLogic(value, searchTerm)
            : value.toString().includes(searchTerm);
        })
        const availabilityFilter = search.availability
          ? rootGetters["availability/getAvailability"](product.manufacturer, product.id).includes(search.availability)
          : true;
        return filteredProducts && availabilityFilter
      })
    },
    getUniqueSet: state => (category, column) => {
      const setArray = [...new Set(state[category].items.map(item => item[column]).flat())]
      if (column === "price") {
        setArray.sort((a, b) => a - b);
      }
      return setArray
    },
    getFilteredUniqueSet: (state, getters) => (category, column, searchInput, maxOptions) => {
      const setArray = getters.getUniqueSet(category, column);
      if (searchInput === "") return setArray.slice(0, maxOptions);
      // Re-evaluate set array filter where items exceed maximum options
      return setArray.filter(item => {
        return item.toString().includes(searchInput);
      }).slice(0, maxOptions)
    }
  }
}