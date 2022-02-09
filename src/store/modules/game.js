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
    allGames: [],
    game: {},
  },
  actions: {
    async fetchGame(context, id) {
      const dbRef = refDb(db, "games");
      await onValueDb(dbRef, (snapshot) => {
        try {
          const data = snapshot.val();
          context.commit("setAllGames", data);
          context.commit("setGame", data[id]);
        } catch (e) {
          console.log(e);
        }
      });
    },
    async updateGame({ commit }, gameData) {
      try {
        updateDb(refDb(db, "games/" + gameData.id), {
          ...gameData,
        });
      } catch (e) {
        commit("error", e);
      }
      if (gameData.img) {
        const storage = getStorage();
        const storageRef = ref(storage, `games/${gameData.id}/main-banner`);
        await uploadBytes(storageRef, gameData.img);
        await getDownloadURL(ref(storage, `games/${gameData.id}/main-banner`))
          .then((url) => {
            updateDb(refDb(db, "games/" + gameData.id), {
              imgSRC: url,
            });
          })
          .catch((error) => {
            console.log("error: ", error);
            // Handle any errors
          });
      }
      if (gameData.mobileBannerImg) {
        const storage = getStorage();
        const storageRef = ref(storage, `games/${gameData.id}/mobile-banner`);
        await uploadBytes(storageRef, gameData.mobileBannerImg);
        await getDownloadURL(ref(storage, `games/${gameData.id}/mobile-banner`))
          .then((url) => {
            updateDb(refDb(db, "games/" + gameData.id), {
              mobileBannerImgSRC: url,
            });
          })
          .catch((error) => {
            console.log("error: ", error);
            // Handle any errors
          });
      }
      if (gameData.gameIconImg) {
        const storage = getStorage();
        const storageRef = ref(storage, `games/${gameData.id}/game-icon`);
        await uploadBytes(storageRef, gameData.gameIconImg);
        await getDownloadURL(ref(storage, `games/${gameData.id}/game-icon`))
          .then((url) => {
            updateDb(refDb(db, "games/" + gameData.id), {
              gameIconImgSRC: url,
            });
          })
          .catch((error) => {
            console.log("error: ", error);
            // Handle any errors
          });
      }
      if (gameData.gameLogoImg) {
        const storage = getStorage();
        const storageRef = ref(storage, `games/${gameData.id}/game-logo`);
        await uploadBytes(storageRef, gameData.gameLogoImg);
        await getDownloadURL(ref(storage, `games/${gameData.id}/game-logo`))
          .then((url) => {
            updateDb(refDb(db, "games/" + gameData.id), {
              gameLogoImgSRC: url,
            });
          })
          .catch((error) => {
            console.log("error: ", error);
            // Handle any errors
          });
      }
      if (gameData.backgroundImg) {
        const storage = getStorage();
        const storageRef = ref(storage, `games/${gameData.id}/background`);
        await uploadBytes(storageRef, gameData.backgroundImg);
        await getDownloadURL(ref(storage, `games/${gameData.id}/background`))
          .then((url) => {
            updateDb(refDb(db, "games/" + gameData.id), {
              backgroundImgSRC: url,
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
    setGame(state, game) {
      state.game = game;
    },
    setAllGames(state, games) {
      state.allGames = games;
    },
    error(state, error) {
      console.log(error);
    },
  },
  getters: {
    getGame(state) {
      return state.game;
    },
    getAllGames(state) {
      return state.allGames;
    },
  },
};
