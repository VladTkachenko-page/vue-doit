<template>
  <div class="games">
    <div class="games__top">
      <h2 class="games__title title">Leagues</h2>
      <div class="default-input games__search">
        <input
          id="searchGame"
          placeholder="Search the game"
          v-model="searchField"
        />
      </div>
    </div>
    <div class="games__cards">
      <div
        class="game-card"
        v-for="game in filteredGames"
        :key="game.id"
        @click="$router.push(`/leagues/${game.title}`)"
      >
        <div class="game-card__img">
          <img src="../../assets/img/dota.jpg" alt="" />
          <span class="game-card__caption">{{ game.title }}</span>
        </div>
      </div>
    </div>
    <div class="games__none title" v-if="filteredGames.length === 0">
      Games not found
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getGames"]),
    filteredGames() {
      return this.games.filter((item) =>
        item.title
          .toString()
          .toLowerCase()
          .includes(this.searchField.toLowerCase())
      );
    },
  },
  mounted() {},
  data() {
    return {
      games: [
        {
          id: 1,
          title: "Dota II",
          src: "../src/assets/img/dota.jpg",
        },
        {
          id: 2,
          title: "CS:GO",
        },
        {
          id: 3,
          title: "StarCraft II",
        },
        {
          id: 4,
          title: "WarCraft III",
        },
        {
          id: 5,
          title: "FIFA 2020",
        },
        {
          id: 6,
          title: "Valorant",
        },
      ],
      searchField: "",
    };
  },
};
</script>

<style scoped>
.games {
  padding: 30px 0;
}
.games__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.games__search {
  border-radius: 4px;
  background-color: transparent;
  color: #fff;
  max-width: 520px;
  width: 100%;
}
.games__search:focus {
  outline: none;
  border-color: #363e48;
}
.games__search::placeholder {
  color: #cccdcd;
}
.games__cards {
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
  max-height: 500px;
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
@media (max-width: 1300px) {
  .games__search {
    margin-right: 0;
  }
}
@media (max-width: 800px) {
  .games__items {
    flex-direction: column;
  }
  .games__item {
    max-width: 100%;
  }
}
@media (max-width: 578px) {
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
