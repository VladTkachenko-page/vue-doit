import { db, refDb, onValueDb, updateDb, removeDb } from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  state: {
    allTeams: {},
    team: {},
  },
  actions: {
    async fetchTeam(context, id) {
      const dbRef = refDb(db, "teams");
      onValueDb(dbRef, (snapshot) => {
        const data = snapshot.val();
        context.commit("setTeam", data[id]);
        context.commit("setAllTeams", data);
      });
    },
    async updateTeam({ commit }, teamData) {
      try {
        updateDb(refDb(db, "teams/" + teamData.id), {
          ...teamData,
        });
      } catch (e) {
        commit("error", e);
      }
      if (teamData.img) {
        const storage = getStorage();
        const storageRef = ref(storage, `teams/${teamData.id}/` + teamData.id);
        await uploadBytes(storageRef, teamData.img);
        await getDownloadURL(
          ref(storage, `teams/${teamData.id}/` + teamData.id)
        )
          .then((url) => {
            updateDb(refDb(db, "teams/" + teamData.id), {
              imgSRC: url,
            });
          })
          .catch((error) => {
            console.log("error: ", error);
            // Handle any errors
          });
      }
    },
    async deleteTeam({ commit }, teamData) {
      try {
        removeDb(refDb(db, "teams/" + teamData.id));
      } catch (e) {
        commit("error", e);
      }
      if (teamData.imgSRC) {
        const storage = getStorage();
        const storageRef = ref(storage, `teams/${teamData.id}/` + teamData.id);
        await deleteObject(storageRef)
          .then(() => {})
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    },
  },
  mutations: {
    setTeam(state, team) {
      state.team = team;
    },
    setAllTeams(state, teams) {
      state.allTeams = teams;
    },
    error(state, error) {
      console.log(error);
    },
  },
  getters: {
    getTeam(state) {
      return state.team;
    },
    getAllTeams(state) {
      return state.allTeams;
    },
  },
};
