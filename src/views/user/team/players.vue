<template>
  <UserLayout>
    <div class="players">
      <h2 class="players__title title">Players</h2>
      <div class="players__items">
        <div class="players__item" v-for="item in teamPlayers" :key="item.id">
          {{ item.login }}
          <img
            class="players__delete"
            @click="deletePlayer(item.id)"
            src="/img/exit.b03f4cb2.svg"
            alt=""
          />
        </div>
        <MainButtons class="players__item" @click="showModal = true">Add</MainButtons>
      </div>
    </div>
  </UserLayout>
  <modal v-if="showModal" @close="showModal = false">
    <template v-slot:header>
      <h1>List of players</h1>
    </template>
    <template v-slot:body>
      <div class="players-list">
        <div class="players-list-item">
          <div class="players-list-item-checkbox">Choice</div>
          <div class="players-list-item-id">ID</div>
          <div class="players-list-item-name">Login</div>
        </div>
        <div
          class="players-list-item"
          v-for="item in this.users"
          :key="item.id"
        >
          <div class="players-list-item-checkbox">
            <label :for="item.id" class="default-checkbox">
              <input
                :id="item.id"
                class="default-checkbox__input"
                type="checkbox"
                v-model="choiceUser"
                :value="{ id: item.id, login: item.login }"
              />
              <span class="default-checkbox__box"></span>
            </label>
          </div>
          <div class="players-list-item-id">
            {{ item.id }}
          </div>
          <div class="players-list-item-name">
            {{ item.login }}
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="edit-team__btn" @click="showModal = false">
        <MainButtons class="secondary">No</MainButtons>
      </div>
      <div class="edit-team__btn" @click="addPlayer">
        <MainButtons>Yes</MainButtons>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapGetters } from "vuex";
import UserLayout from "@/layouts/UserLayout.vue";
import MainButtons from "@/components/default/MainButtons.vue";
import modal from "@/components/modal.vue";
import { db, refDb, updateDb, removeDb } from "@/firebase.js";

export default {
  computed: {
    usersFiltered() {
      let users = this.users;
      Object.keys(users).forEach((item) => {
        for (let i = 0; i < this.teamPlayers.length; i++) {
          if (users[item]) {
            if (users[item].login === this.teamPlayers[i].login) {
              delete users[item];
            }
          }
        }
      });
      return users;
    },
    ...mapGetters(["getTeam", "getUser", "getAllUsers"]),
  },
  components: {
    UserLayout,
    MainButtons,
    modal,
  },

  data() {
    return {
      id: "",
      users: {},
      team: {},
      teamPlayers: [],
      showModal: false,
      choiceUser: [],
    };
  },
  async mounted() {
    this.id = this.$attrs.id;
    await this.$store.dispatch("fetchTeam", this.$attrs.id);
    this.users = this.getAllUsers;
    this.team = this.getTeam;
    if (this.team.players) {
      Object.keys(this.team.players).forEach((item) => {
        this.teamPlayers.push(this.team.players[item]);
      });
      this.users = this.usersFiltered;
    }
  },

  methods: {
    async addPlayer() {
      this.choiceUser.forEach((item) => {
        try {
          updateDb(refDb(db, `teams/${this.id}/players/${item.id}`), {
            id: item.id,
            login: item.login,
          });
        } catch (e) {
          return this.$toast.error(e);
        }
        this.teamPlayers.push(item);
      });
      this.showModal = false;
      this.$toast.success(`Players has been added to team`);
      this.users = this.usersFiltered;
      this.$router.push(`/user/team/manage/${this.$attrs.id}`);
    },
    async deletePlayer(id) {
      try {
        await removeDb(refDb(db, `teams/${this.getTeam.id}/players/${id}`));
      } catch (e) {
        return this.$toast.error(e);
      }
      let index = this.teamPlayers.findIndex((el) => el.id === id);
      this.teamPlayers.splice(index, 1);
      await this.$store.dispatch("fetchUsers");
      this.users = this.getAllUsers;
      this.users = this.usersFiltered;
      this.$toast.success("Player has been deleted");
    }
  },
};
</script>

<style scoped>
.players {
  width: 100%;
}
.players__title {
  text-align: center;
  margin-bottom: 40px;
}
.players__items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 64px;
}
.players__item {
  padding: 30px 15px;
  min-width: 230px;
  border: 2px solid #20252b;
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  color: #fff;
  position: relative;
}
.players__delete {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.players-list {
  margin-top: 10px;
}
.players-list-item {
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 10px;
}
.players-list-item-delete.create {
  color: red;
  max-width: 10px;
  margin: 0 auto;
  cursor: pointer;
}
.players-list-btn {
  margin-top: 20px;
  margin: 0 auto;
}
.players-list-item-checkbox {
  display: flex;
  margin: 0 auto;
}
</style>
