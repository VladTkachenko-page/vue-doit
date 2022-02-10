<template>
  <div class="games">
    <div class="games__search">
      <div class="games__search_title title">
        <h3>Games</h3>
      </div>
      <MainButtons
        @click="this.$router.push(`/admin/game/${new Date().getTime()}`)"
      >
        New Game
      </MainButtons>
      <DefaultInput
        class="games__search_input"
        :id="'searchGame'"
        :placeholder="'Search the game'"
        @updateField="updateSearchGame"
      />
    </div>

    <div class="games__wrap">
      <div
        class="game-card"
        v-for="game in foundItems"
        :key="game.id"
        @click="this.$router.push(`/admin/game/${game.id}`)"
      >
        <div class="game-card__img">
          <img :src="game.imgSRC" alt="" />
          <span class="game-card__caption">{{ game.title }}</span>
        </div>
      </div>

      <div class="games__none title" v-if="foundItems.length === 0">
        Games not found
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultInput from "@/components/default/DefaultInput.vue";
import MainButtons from "@/components/default/MainButtons.vue";
import { db, refDb, onValueDb } from "../firebase.js";

export default {
  data() {
    return {
      searchGame: "",
      games: [],
    };
  },

  async mounted() {
    try {
      await this.$store.commit("setShowloader", true);
      const dbRef = refDb(db, "games");
      await onValueDb(dbRef, (snapshot) => {
        try {
          const data = snapshot.val();
          Object.keys(data).forEach((item) => {
            this.games.push(data[item]);
          });
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
    await this.$store.commit("setShowloader", false);
  },

  computed: {
    ...mapGetters(["getAllGames", "getCheckLoading"]),
    foundItems() {
      return this.games.filter((item) =>
        item.title.toLowerCase().includes(this.searchGame.toLowerCase())
      );
    },
  },

  components: {
    DefaultInput,
    MainButtons,
  },

  methods: {
    updateSearchGame(field) {
      this.searchGame = field;
    },
  },
};
</script>

<style scoped>
.games__search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.games__search_title h3 {
  margin: 0;
}
.games__search_input {
  max-width: 512px;
}
.games__wrap {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 30px 40px;
  margin-top: 20px;
}
.game-card {
  width: 387px;
  max-height: 500px;
  height: 100%;
  cursor: pointer;
}
.game-card__img {
  position: relative;
  max-width: 387px;
  height: 500px;
}
.game-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.game-card__caption {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  line-height: 100%;
}
.games__none {
  text-align: center;
}

@media (max-width: 1100px) {
  .games__search {
    margin-top: 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }
  .games__search_input {
    max-width: 100%;
  }
}
@media (max-width: 578px) {
  .games__wrap {
    flex-flow: column nowrap;
    align-items: center;
  }
  .game-card {
    width: 100%;
    height: 128px;
  }
  .game-card__img {
    max-width: 100%;
    max-height: 128px;
    height: 128px;
  }
  .game-card__img img {
    filter: brightness(50%);
    object-position: 30% 30%;
  }
  .game-card__caption {
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
