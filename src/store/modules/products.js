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
      // Filter tests product properties and availability against search inputs
      return state[category].items.filter(product => {

        const productTest = Object.entries(product).every(currentProperty => {
          const searchInput = search[currentProperty[0]];
          const propValue = currentProperty[1];
          if (!searchInput) return true
          return currentProperty[0] === "price"
            ? parseLogic(propValue, searchInput)
            : propValue.toString().includes(searchInput);
        })

        const availabilityTest = search.availability
          ? rootGetters["availability/getAvailability"](product.manufacturer, product.id).includes(search.availability)
          : true;
        
        return productTest && availabilityTest
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
      // Where items exceed maximum option size, array filter needs to be re-evaluated upon input
      return setArray.filter(item => {
        return item.toString().includes(searchInput);
      }).slice(0, maxOptions)
    }
  }
}