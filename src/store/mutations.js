const initAvailabilityManufacturer = (state, manufacturer) => {
  state.availability[manufacturer] = {
    items: null,
    isFetching: false,
    fetchCall: null
  };
}

const setData = (state, payload) => {
  state[payload.module][payload.type].items = payload.data;
}
const setIsFetching = (state, payload) => {
  state[payload.module][payload.type].isFetching = payload.isFetching;
}
const setCall = (state, payload) => {
  state[payload.module][payload.type].fetchCall = payload.call;
}

export default {
  initAvailabilityManufacturer,
  setData,
  setIsFetching,
  setCall
}