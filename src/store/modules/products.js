export default {
  namespaced: true,
  state: {
    jackets: { items: null, isFetching: false, fetchCall: null },
    shirts: { items: null, isFetching: false, fetchCall: null },
    accessories: { items: null, isFetching: false, fetchCall: null }
  },
  getters: {
    getProducts: state => (category, page) => {
      const minIndex = page ? (page - 1) * 100: 0;
      const maxIndex = page ? page * 100 : undefined;
      return state[category].items.map((item, index) => {
        return {
          index: index + 1,
          name: item.name,
          id: item.id,
          manufacturer: item.manufacturer,
          price: item.price,
          color: item.color.join(', ')
        }
      }).slice(minIndex, maxIndex);
    },
    getFilteredProducts: () => {

    },
    getPages: (state, getters) => category => {
      // return Math.ceil(state[category].items.length / 100); 
      return Math.ceil(getters.getProducts(category).length / 100); 
    },
    getUniqueSet: state => (category, column) => {
      return [...new Set(state[category].items.map(item => item[column]).flat())]
    },
    getFilteredUniqueSet: (state, getters) => (category, column, searchInput, maxOptions) => {
      const searchTerm = searchInput.toString().toUpperCase();
      return getters.getUniqueSet(category, column)
        .filter(item => {
          return item.toString().includes(searchTerm)
        })
        .slice(0, maxOptions)
    }
  }
}