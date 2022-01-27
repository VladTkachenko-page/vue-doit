import { createStore } from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import team from "./modules/team";

export default createStore({
  state: {
    showloader: true,
  },
  mutations: {
    setShowloader(state, bool) {
      state.showloader = bool;
    },
  },
  actions: {},
  getters: {
    getCheckLoading(state) {
      return state.showloader;
    },
  },
  modules: {
    auth,
    user,
    team,
  },
});
