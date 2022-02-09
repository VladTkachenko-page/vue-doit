import { createStore } from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import team from "./modules/team";
import game from "./modules/game";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    auth,
    user,
    team,
    game,
  },
});
