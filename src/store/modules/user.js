import { db, refDb, onValueDb, updateDb } from "../../firebase.js";
// import {
//   getAuth,
// } from "firebase/auth";

export default {
  state: {
    allUsers: {},
    user: {},
  },
  actions: {
    async fetchUser(context, uid) {
      const dbRef = refDb(db, "users");
      onValueDb(dbRef, (snapshot) => {
        const data = snapshot.val();
        context.commit("setUser", data[uid]);
        context.commit("setAllUsers", data);
      });
    },
    async fetchUsers(context) {
      const dbRef = refDb(db, "users");
      onValueDb(dbRef, (snapshot) => {
        const data = snapshot.val();
        context.commit("setAllUsers", data);
      });
    },
    async updateUser({ commit }, userData) {
      try {
        updateDb(refDb(db, "users/" + userData.uid), {
          login: userData.login,
          name: userData.name,
          country: userData.country,
          birthday: userData.birthday,
          sex: userData.sex,
          teams: userData.teams,
          mainTeam: userData.mainTeam,
          age: userData.age,
        });
      } catch (e) {
        commit("error", e);
      }
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAllUsers(state, users) {
      state.allUsers = users;
    },
    error(state, error) {
      console.log(error);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getAllUsers(state) {
      return state.allUsers;
    },
  },
};
