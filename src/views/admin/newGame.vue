<template>
  <div class="games-edit">
    <div class="games-edit__title">New/Edit Game</div>
    <form class="games-edit__form" @submit.prevent="submit">
      <div class="games-edit__form-wrap">
        <div class="games-edit__form-title">Basic info</div>
        <div class="games-edit__form-input">
          <p class="games-edit__form-text">Game name</p>
          <DefaultInput
            :placeholder="'Game name'"
            :field="title"
            :invalid="v$.title.$dirty && v$.title.$error"
            :success="v$.title.$dirty && !v$.title.$error"
            :errorMessage="v$.title.$errors"
            @updateField="updateTitle"
          />
        </div>
        <p class="games-edit__form-text">URL</p>
        <DefaultInput
          :id="'gamePath'"
          :disabled="true"
          :field="'doit.gg/games/' + this.id"
        />
        <p class="games-edit__form-text">Description</p>
        <DefaultTextarea
          class="games-edit__form-input"
          :placeholder="'You can write here somebody about your tournament....'"
          :field="description"
          @updateField="updateDescription"
        />
      </div>
      <div class="games-edit__form-wrap">
        <div class="games-edit__form-title">Capsules</div>
        <div class="games-edit__form-file">
          <p class="games-edit__form-text">Main Banner 387x500*</p>
          <DefaultFileinput
            name="banner url"
            :img="imgSRC"
            @uploadFile="uploadMainBannerImg"
          />
          <div v-if="!getGame">
            <p class="games-edit__fail-message" v-if="v$.img.$error">
              Value is required
            </p>
          </div>
        </div>
        <p class="games-edit__form-text">Mobile Banner 329x129</p>
        <DefaultFileinput
          name="banner url"
          :img="mobileBannerImgSRC"
          @uploadFile="uploadMobileBannerImg"
        />
        <div class="games-edit__form-file">
          <p class="games-edit__form-text">Game icon 32x32*</p>
          <DefaultFileinput
            name="icon url"
            :img="gameIconImgSRC"
            @uploadFile="uploadGameIconImg"
          />
          <div v-if="!getGame">
            <p class="games-edit__fail-message" v-if="v$.gameIconImg.$error">
              Value is required
            </p>
          </div>
        </div>
        <div class="games-edit__form-file">
          <p class="games-edit__form-text">Game logo 64x64*</p>
          <DefaultFileinput
            name="logo url"
            :img="gameLogoImgSRC"
            @uploadFile="uploadGameLogoImg"
          />
          <div v-if="!getGame">
            <p class="games-edit__fail-message" v-if="v$.gameLogoImg.$error">
              Value is required
            </p>
          </div>
        </div>
        <p class="games-edit__form-text">Game background 2206x2278</p>
        <DefaultFileinput
          name="background url"
          :img="backgroundImgSRC"
          @uploadFile="uploadBackgroundImg"
        />
      </div>
      <div class="games-edit__form-wrap">
        <div class="games-edit__form-title">Tournament system</div>
        <div class="games-edit__form-radio">
          <p class="games-edit__form-text">Active</p>
          <DefaultRadio
            :selects="selectArray"
            :selectValue="tournamentsActive"
            name="TournamentSystem"
            @updateRadioSelect="updateTournamentsActive"
          />
        </div>
        <div
          class="games-edit__form-item"
          v-if="this.tournamentsActive === 'Yes'"
        >
          <p class="games-edit__form-text">Servers system</p>
        </div>
      </div>
      <div class="games-edit__form-btns">
        <MainButtons
          @click="showModal = true"
          class="games-edit__form-btn secondary"
          type="button"
          >Delete Game</MainButtons
        >
        <MainButtons class="games-edit__form-btn secondary"
          >Save changes</MainButtons
        >
      </div>
    </form>
  </div>
  <modal v-if="showModal" @close="closeModal">
    <template v-slot:header>
      <h1>Delete Game</h1>
    </template>
    <template v-slot:body>
      <p>Are you sure you want to delete {{ getGame.title }}?</p>
    </template>
    <template v-slot:footer>
      <div class="edit-team__btn" @click="closeModal">
        <MainButtons class="secondary">No</MainButtons>
      </div>
      <div class="edit-team__btn" @click="deleteGame">
        <MainButtons>Yes</MainButtons>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import DefaultInput from "@/components/default/DefaultInput.vue";
import DefaultRadio from "@/components/default/DefaultRadio.vue";
import DefaultFileinput from "@/components/default/DefaultFileinput.vue";
import DefaultTextarea from "@/components/default/DefaultTextarea.vue";
import MainButtons from "@/components/default/MainButtons.vue";
import modal from "@/components/modal.vue";

export default {
  setup: () => ({ v$: useVuelidate() }),
  computed: mapGetters(["getGame"]),
  data() {
    return {
      id: "",
      title: "",
      description: "",
      img: "",
      mobileBannerImg: "",
      gameIconImg: "",
      gameLogoImg: "",
      backgroundImg: "",
      imgSRC: "",
      mobileBannerImgSRC: "",
      gameIconImgSRC: "",
      gameLogoImgSRC: "",
      backgroundImgSRC: "",
      selectArray: {
        0: {
          title: "No",
        },
        1: {
          title: "Yes",
        },
      },
      tournamentsActive: "",
      showModal: false,
    };
  },

  components: {
    MainButtons,
    DefaultTextarea,
    DefaultInput,
    DefaultFileinput,
    DefaultRadio,
    modal
  },

  async mounted() {
    this.id = this.$attrs.id;
    await this.$store.commit("setShowloader", true);
    await this.$store.dispatch("fetchGame", this.$attrs.id);
    if (this.getGame) {
      this.title = this.getGame.title;
      this.description = this.getGame.description;
      this.imgSRC = this.getGame.imgSRC;
      this.mobileBannerImgSRC = this.getGame.mobileBannerImgSRC;
      this.gameIconImgSRC = this.getGame.gameIconImgSRC;
      this.gameLogoImgSRC = this.getGame.gameLogoImgSRC;
      this.backgroundImgSRC = this.getGame.backgroundImgSRC;
    }
    await this.$store.commit("setShowloader", false);
  },
  validations() {
    if (!this.getGame) {
      return {
        title: {
          required,
          minLength: minLength(2),
        },
        img: { required },
        gameIconImg: { required },
        gameLogoImg: { required },
      };
    } else {
      return {
        title: {
          required,
          minLength: minLength(2),
        },
      };
    }
  },

  methods: {
    async submit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      } else {
        const game = {
          id: this.id,
          title: this.title,
          description: this.description || "",
          img: this.img,
          mobileBannerImg: this.mobileBannerImg,
          gameIconImg: this.gameIconImg,
          gameLogoImg: this.gameLogoImg,
          backgroundImg: this.backgroundImg,
        };
        try {
          await this.$store.commit("setShowloader", true);
          await this.$store.dispatch("updateGame", game);
          await this.$store.commit("setShowloader", false);
          this.$router.push("/games");
        } catch (e) {
          return this.$toast.error(e);
        }
        if (this.getGame) {
          this.$toast.success("Game has been updated");
        } else {
          this.$toast.success("Game has been created");
        }
      }
    },
    async deleteGame() {
      try {
        await this.$store.dispatch("deleteGame", this.getGame);
        this.showModal = false;
        this.getGame = null;
      } catch (e) {
        return this.$toast.error(e);
      }
      this.$toast.success("Game has been deleted");
      this.$router.push("/games");
    },

    updateTitle(field) {
      this.title = field;
    },
    updateDescription(field) {
      this.description = field;
    },
    uploadMainBannerImg(img) {
      this.img = img;
    },
    uploadMobileBannerImg(img) {
      this.mobileBannerImg = img;
    },
    uploadGameIconImg(img) {
      this.gameIconImg = img;
    },
    uploadGameLogoImg(img) {
      this.gameLogoImg = img;
    },
    uploadBackgroundImg(img) {
      this.backgroundImg = img;
    },
  },
};
</script>

<style scoped>
.games-edit {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
}
.games-edit__title {
  text-align: center;
  margin-bottom: 30px;
  color: #0f1215;
  background-color: #d8dfeb;
  padding: 30px 0;
  font-weight: 700;
  font-size: 22px;
}
.games-edit__fail-message {
  font-size: 12px;
  color: #b83333;
}
.games-edit__form {
  color: #cccdcd;
  max-width: 620px;
  margin: 0 auto;
}
.games-edit__form-wrap {
  padding: 44px 60px;
  border: 1px solid #20252b;
  margin-bottom: 33px;
}
.games-edit__form-title {
  font-weight: 700;
  margin-bottom: 40px;
}
.games-edit__form-text {
  margin-bottom: 12px;
}
.games-edit__form-url {
  margin-bottom: 22px;
}
.games-edit__form-input {
  margin-bottom: 22px;
}
.games-edit__form-dropdown {
  margin-bottom: 22px;
}
.games-edit__form-file {
  margin-bottom: 22px;
}
.games-edit__form-map {
  position: relative;
}
.games-edit__form-map-wrap {
  display: flex;
  gap: 7px;
  margin-bottom: 5px;
}
.games-edit__form-map-delete {
  color: red;
  position: absolute;
  right: 0;
  cursor: pointer;
}
.games-edit__form-map-delete.hidden {
  display: none;
}
.games-edit__form-map-input {
  flex-basis: 30%;
}
.games-edit__form-map-file-input {
  flex-basis: 70%;
}
.games-edit__form-maps-btn {
  max-width: 190px;
  margin: 20px auto 0;
}
.games-edit__form-btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 34px;
}
.games-edit__form-btn {
  max-width: 170px;
}
</style>
