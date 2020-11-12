export default {
  namespaced: true,
  state: {
    jackets: { items: null, isFetching: false, fetchCall: null },
    shirts: { items: null, isFetching: false, fetchCall: null },
    accessories: { items: null, isFetching: false, fetchCall: null }
  },
  getters: {
    getProducts: state => (category, page) => {
      const minIndex = (page - 1) * 100
      const maxIndex = page * 100;
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
    getPages: state => category => {
      return Math.ceil(state[category].items.length / 100);
    },
    getManufacturerSet: state => (category) => {
      const distinctManufacturers = [...new Set(state[category].items.map(item => item.manufacturer))]
      return distinctManufacturers;
    }
  }
}