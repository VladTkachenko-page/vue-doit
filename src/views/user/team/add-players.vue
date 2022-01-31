<template>
  <UserLayout>
    <div class="add-players">
      <h2 class="add-players__title title">Add players</h2>
      <div class="add-players__items">
        <div
          class="add-players__item"
          v-for="item in teamPlayers"
          :key="item.id"
        >
          {{ item.login }}
        </div>
        <MainButtons @click="showModal = true">Add</MainButtons>
      </div>
    </div>
  </UserLayout>
  <modal v-if="showModal" @close="showModal = false">
    <template v-slot:header>
      <h1>List of players</h1>
    </template>
    <template v-slot:body>
      <div class="create-team__players-list">
        <div class="create-team__players-list-item">
          <div class="create-team__players-list-item-checkbox">Choice</div>
          <div class="create-team__players-list-item-id">ID</div>
          <div class="create-team__players-list-item-name">Login</div>
        </div>
        <div
          class="create-team__players-list-item"
          v-for="item in this.users"
          :key="item.id"
        >
          <div class="create-team__players-list-item-checkbox">
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
          <div class="create-team__players-list-item-id">
            {{ item.id }}
          </div>
          <div class="create-team__players-list-item-name">
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
import { db, refDb, updateDb } from "@/firebase.js";

export default {
  computed: {
    usersFiltered() {
      let users = this.users;
      Object.keys(this.users).forEach((id) => {
        Object.keys(this.teamPlayers).forEach((item) => {
          if (this.users[id].login === this.teamPlayers[item].login) {
            delete this.users[id];
          }
        });
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
      this.teamPlayers = this.team.players;
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
    },
  },
};
</script>

<style scoped>
.add-players {
  width: 100%;
}
.add-players__title {
  text-align: center;
  margin-bottom: 40px;
}
.add-players__items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 64px;
}
.add-players__item {
  padding: 30px 15px;
  min-width: 230px;
  border: 2px solid #20252b;
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
  color: #fff;
}
.create-team__players-list {
  margin-top: 10px;
}
.create-team__players-list-item {
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 10px;
}
.create-team__players-list-item-delete.create {
  color: red;
  max-width: 10px;
  margin: 0 auto;
  cursor: pointer;
}
.create-team__players-list-btn {
  margin-top: 20px;
  margin: 0 auto;
}
.create-team__players-list-item-checkbox {
  display: flex;
  margin: 0 auto;
}
</style>
