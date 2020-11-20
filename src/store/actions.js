import { badApiHTTP } from "@/service/index.js";

/* 
  * Returns a fetch promise to any simultaneous calls to the same
  * endpoint. Only the first fetch call is dispatched, subsequent
  * calls to the same endpoint receive a promise from the first call.
*/
const fetchData = ({ state, commit, dispatch }, { module, type }) => {
  const data = state[module][type];
  if (data.isFetching) {
    return data.fetchCall;
  }
  commit("setIsFetching", { module, type, isFetching: true });
  const call = dispatch("callback", { module, type });
  commit("setCall", {
    module,
    type,
    call
  });
  return call;
}

const callback = async ({ commit }, { module, type }) => {
  const response = await badApiHTTP.get(`${module}/${type}`);
  if (response.status === 200) {
    commit("setData", {
      module,
      type,
      data: response.data.response || response.data
    })
  }
  commit("setIsFetching", { module, type, isFetching: false });
  commit("setCall", {
    module,
    type,
    call: false
  });
  return Promise.resolve(type);
}

export default {
  fetchData,
  callback
}