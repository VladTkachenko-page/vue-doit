<template>
  <div class="home">
    <div class="home__offer" v-if="!user">
      <h1 class="home__title">DOIT <span class="hide">BETA</span></h1>
      <div class="home__text">
        Prepare for your esports career and get ready for awesome tournaments
        with big prize pools and many fun!
        <span>Register&nbsp;Now!</span>
      </div>
      <div class="home__btns">
        <MainButtons class="secondary" @click="$router.push('/login')"
          >Login</MainButtons
        >
        <MainButtons class="primary" @click="$router.push('/signup')"
          >Sign up</MainButtons
        >
      </div>
    </div>
    <div class="home__items home__games">
      <div class="home__items-title title">Games</div>
      <DefaultSlider>
        <template v-slot:slide>
          <swiper-slide
            class="home__items-slide"
            v-for="item in games"
            :key="item.id"
          >
            <div class="game-card">
              <div class="game-card__img">
                <img :src="item.imgSRC" alt="" />
                <span class="game-card__caption">{{ item.title }}</span>
              </div>
            </div>
          </swiper-slide>
        </template>
      </DefaultSlider>
    </div>
  </div>
</template>

<script>
import MainButtons from "@/components/default/MainButtons.vue";
import DefaultSlider from "@/components/default/DefaultSlider.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SwiperSlide } from "swiper/vue/swiper-vue";
import { db, refDb, onValueDb } from "../firebase.js";

export default {
  data() {
    return {
      auth: getAuth(),
      user: false,
      games: [],
    };
  },
  components: {
    MainButtons,
    DefaultSlider,
    SwiperSlide,
  },
  async mounted() {
    await onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = true;
      } else {
        this.user = false;
      }
    });
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
};
</script>
<style scoped>
.home {
  background-repeat: repeat;
  padding-top: 60px;
  padding-bottom: 30px;
  background-image: url("~@/assets/img/main_bg.jpg");
}
.home__offer {
  text-align: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  padding-bottom: 410px;
  padding-top: 210px;
  margin-bottom: 25px;
  background-image: url("~@/assets/img/offer_bg.svg");
}
.home__title {
  color: #fff;
  font-size: 125px;
  line-height: 100%;
  font-weight: 700;
  margin: 0;
  margin-bottom: 15px;
}
.home__text {
  color: #ccc;
  max-width: 440px;
  margin: 0 auto 20px;
}
.home__btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
@media (max-width: 1100px) {
  .home__offer {
    padding: 50px 0;
  }
  .home__title {
    font-size: 84px;
  }
  .home__btns {
    display: none;
  }
  .hide {
    display: none;
  }
}
@media (max-width: 749px) {
  .game-card {
    margin: 0 auto;
    width: 100%;
    height: 204px;
  }
  .game-card__img {
    max-width: 100%;
    max-height: 204px;
    height: 204px;
  }
  .game-card__img img {
    object-position: 30% 30%;
  }
  .game-card__caption {
    width: 100%;
    text-align: center;
  }
}
</style>
