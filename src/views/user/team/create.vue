<template>
  <UserLayout>
    <div v-if="!getCheckLoading" class="create-team">
      <h2 v-if="!getTeam" class="create-team__title title">Create Team</h2>
      <h2 v-else class="create-team__title title">Edit Team</h2>
      <form class="create-team__form" @submit.prevent="submit">
        <div class="create-team__form-wrap">
          <div class="create-team__form-title">Basic info</div>
          <p class="create-team__form-text">Team name</p>
          <DefaultInput
            :id="'name'"
            :field="this.name"
            :placeholder="'Team M8B'"
            :invalid="v$.name.$dirty && v$.name.$error"
            :success="v$.name.$dirty && !v$.name.$error"
            :errorMessage="v$.name.$errors"
            @updateField="updateName"
          />
          <p v-if="getTeam" class="create-team__form-text">ID</p>
          <div v-if="getTeam" class="default-input">
            <DefaultInput
              :id="'id'"
              :disabled="true"
              :placeholder="'0000000'"
              :field="this.id"
            />
          </div>
          <p class="create-team__form-text">Main Game</p>
          <div class="default-country-select">
            <select
              v-model="game"
              id="game"
              className="default-country-select_style"
            >
              <option value="" selected>Choose game</option>
              <option value="Dota II">Dota II</option>
              <option value="CS:GO">CS:GO</option>
              <option value="StarCraft II">StarCraft II</option>
              <option value="WarCraft III">WarCraft III</option>
              <option value="FIFA 2020">FIFA 2020</option>
              <option value="Valorant">Valorant</option>
            </select>
          </div>
          <p class="create-team__form-text">Team Leader</p>
          <DefaultInput
            :id="'leader'"
            :placeholder="'user993'"
            :field="this.leader"
            :invalid="v$.leader.$dirty && v$.leader.$error"
            :success="v$.leader.$dirty && !v$.leader.$error"
            :errorMessage="v$.leader.$errors"
            @updateField="updateLeader"
          />
          <p class="create-team__form-text">Join password</p>
          <DefaultInput
            :id="'password'"
            :placeholder="'123213423'"
            :field="this.password"
            :invalid="v$.password.$dirty && v$.password.$error"
            :success="v$.password.$dirty && !v$.password.$error"
            :errorMessage="v$.password.$errors"
            @updateField="updatePassword"
          />
          <p class="create-team__form-text">Country</p>
          <div
            class="default-country-select"
            :class="{
              'default-country-select__invalid':
                v$.country.$dirty && v$.country.$error,
              'default-country-select__success':
                v$.country.$dirty && !v$.country.$error,
            }"
          >
            <country-select
              v-model="country"
              :country="country"
              topCountry="US"
              className="default-country-select_style"
            />
            <div
              class="default-country-select__message"
              v-for="(error, index) of v$.country.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </div>
          <p class="create-team__form-text">Web-site</p>
          <DefaultInput
            :id="'name'"
            :field="this.website"
            :placeholder="'TeamBlacer.com'"
            @updateField="updateWebsite"
          />
          <p class="create-team__form-text">URL</p>
          <div class="create-team__form-url">doit.gg/team/{{ this.id }}</div>
        </div>
        <div class="create-team__form-wrap" v-if="getTeam">
          <div class="create-team__form-title">Players</div>
          <div class="create-team__players">
            <div class="create-team__players-btn" @click="toggleList">
              List of players
            </div>
            <div
              class="create-team__players-btn"
              @click="
                this.$router.push(`/user/team/${this.getTeam.id}/players`)
              "
            >
              Edit list of players
            </div>
          </div>
        </div>
        <div class="create-team__form-wrap">
          <div class="create-team__form-title">Advance info</div>
          <p class="create-team__form-text">Logo 128x128</p>
          <DefaultFileinput
            name="logo url"
            :img="imgSRC"
            @uploadFile="uploadImg"
          />
        </div>
        <div class="create-team__form-btns">
          <MainButtons
            v-if="!getTeam"
            @click="this.$router.push('/user/team')"
            class="create-team__form-btn secondary"
            >Cancel</MainButtons
          >
          <MainButtons
            v-else
            @click.prevent="showModal = true"
            class="create-team__form-btn secondary"
            >Delete Team</MainButtons
          >
          <MainButtons v-if="!getTeam" class="create-team__form-btn secondary"
            >Create Team</MainButtons
          >
          <MainButtons v-else class="create-team__form-btn secondary"
            >Save Team</MainButtons
          >
        </div>
      </form>
    </div>
  </UserLayout>
  <modal v-if="showModal" @close="closeModal">
    <template v-slot:header>
      <h1 v-if="listPlayer">List of players</h1>
      <h1 v-else>Delete Team</h1>
    </template>
    <template v-slot:body>
      <div class="create-team__players-list" v-if="listPlayer">
        <div class="create-team__players-list-item">
          <div class="create-team__players-list-item-id">ID</div>
          <div class="create-team__players-list-item-name">Name</div>
        </div>
        <div
          class="create-team__players-list-item"
          v-for="item in getTeam.players"
          :key="item.id"
        >
          <div class="create-team__players-list-item-id">
            {{ item.id }}
          </div>
          <div class="create-team__players-list-item-name">
            {{ item.login }}
          </div>
        </div>
      </div>
      <p v-else>Are you sure you want to delete {{ getTeam.name }}?</p>
    </template>
    <template v-slot:footer v-if="listPlayer">
      <div class="edit-team__btn" @click="closeModal">
        <MainButtons>OK</MainButtons>
      </div>
    </template>
    <template v-slot:footer v-else>
      <div class="edit-team__btn" @click="closeModal">
        <MainButtons class="secondary">No</MainButtons>
      </div>
      <div class="edit-team__btn" @click="deleteTeam">
        <MainButtons>Yes</MainButtons>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultFileinput from "@/components/default/DefaultFileinput.vue";
import MainButtons from "@/components/default/MainButtons.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import UserLayout from "@/layouts/UserLayout.vue";
import { db, refDb, updateDb, removeDb } from "@/firebase.js";
import modal from "@/components/modal.vue";
import DefaultInput from "@/components/default/DefaultInput.vue";

export default {
  setup: () => ({ v$: useVuelidate() }),
  computed: mapGetters(["getUser", "getTeam", "getCheckLoading"]),

  components: {
    UserLayout,
    MainButtons,
    DefaultFileinput,
    DefaultInput,
    modal,
  },

  data() {
    return {
      id: "",
      name: "",
      game: "",
      leader: "",
      password: "",
      country: "",
      website: "",
      img: "",
      players: {},
      date: "",
      imgSRC: "",
      showModal: false,
      updatedPlayers: "",
      listPlayer: false,
    };
  },

  validations() {
    return {
      name: {
        required,
        minLength: minLength(2),
      },
      password: {
        required,
        minLength: minLength(6),
      },
      leader: {
        required,
      },
      country: {
        required,
      },
    };
  },
  async mounted() {
    this.id = this.$attrs.id;
    await this.$store.dispatch("fetchTeam", this.$attrs.id);
    if (this.getTeam) {
      this.name = this.getTeam.name;
      this.game = this.getTeam.game;
      this.password = this.getTeam.password;
      this.leader = this.getTeam.leader;
      this.country = this.getTeam.country;
      this.website = this.getTeam.website;
      this.imgSRC = this.getTeam.imgSRC;
    }
    this.players[this.getUser.id] = {
      id: this.getUser.id,
      name: this.getUser.username,
    };
  },
  methods: {
    async submit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      } else {
        this.getDateNow();
        const team = {
          id: this.id,
          name: this.name,
          game: this.game,
          leader: this.leader,
          password: this.password,
          country: this.country,
          website: this.website,
          img: this.img,
          creationDate: this.date,
        };
        try {
          await this.$store.dispatch("updateTeam", team);
        } catch (e) {
          return this.$toast.error(e);
        }
        try {
          await updateDb(
            refDb(db, `users/${this.getUser.uid}/teams/${this.id}`),
            { id: this.id, name: this.name }
          );
        } catch (e) {
          return this.$toast.error(e);
        }
        if (this.getTeam) {
          this.$toast.success("Team has been updated");
        } else {
          this.$toast.success("Team has been created");
        }
        this.$router.push("/user/team");
      }
    },
    async deleteTeam() {
      try {
        const team = {
          id: this.id,
          imgSRC: this.imgSRC,
        };
        await this.$store.dispatch("deleteTeam", team);
      } catch (e) {
        return this.$toast.error(e);
      }
      try {
        await removeDb(refDb(db, `users/${this.getUser.uid}/teams/${this.id}`));
      } catch (e) {
        return this.$toast.error(e);
      }
      this.$toast.success("Team has been deleted");
      this.$router.push("/user/team");
    },
    getDateNow() {
      const dateObj = new Date();
      let day = dateObj.getDate();
      let month = dateObj.getMonth() + 1;
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      this.date = day + "/" + month + "/" + dateObj.getFullYear();
    },
    uploadImg(img) {
      this.img = img;
    },
    updatePassword(field) {
      this.password = field;
    },
    updateName(field) {
      this.name = field;
    },
    updateLeader(field) {
      this.leader = field;
    },
    updateWebsite(field) {
      this.website = field;
    },
    toggleList() {
      this.listPlayer = !this.listPlayer;
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
      this.listPlayer = false;
    },
  },
};
</script>

<style scoped>
.create-team {
  width: 100%;
  padding-bottom: 100px;
  color: #fff;
}
.create-team__title {
  text-align: center;
  margin-bottom: 30px;
}
.create-team__form {
  color: #cccdcd;
  max-width: 620px;
  margin: 0 auto;
}
.create-team__form-wrap {
  padding: 44px 60px;
  border: 1px solid #20252b;
  margin-bottom: 33px;
}
.create-team__form-title {
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 22px;
  line-height: 100%;
  color: #cccdcd;
}
.create-team__form-input {
  margin-bottom: 22px;
}
.create-team__form-dropdown {
  margin-bottom: 22px;
}
.create-team__form-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 34px;
}
.create-team__form-btn {
  max-width: 160px;
}
.default-input .default-input__checkmark,
.default-input .default-input__times {
  top: 0;
}
.create-team__players-btn {
  color: #0a61e1;
  font-weight: 700;
  padding: 12px 16px;
  background-color: #1a222d;
  cursor: pointer;
  max-width: 150px;
  text-align: center;
}
.create-team__players-list {
  margin-top: 10px;
}
.create-team__players-list-item {
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr;
}
.create-team__players-list-item:first-child {
  color: #627ca3;
}
.create-team__players-list-btn {
  margin-top: 20px;
  margin: 0 auto;
}
.create-team__players {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
