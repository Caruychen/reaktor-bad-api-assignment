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
      return state[category].items.filter(product => {
        const filteredProducts = Object.entries(product).every(currentProperty => {
          const searchTerm = search[currentProperty[0]];
          const value = currentProperty[1];
          if (!searchTerm) return true;
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
      const searchTerm = searchInput.toString();
      return getters.getUniqueSet(category, column)
        .filter(item => {
          return item.toString().includes(searchTerm);
        })
        .slice(0, maxOptions)
    }
  }
}