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
  </div>
</template>

<script>
import MainButtons from "@/components/default/MainButtons.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      auth: getAuth(),
      user: false,
    };
  },
  components: {
    MainButtons,
  },
  async mounted() {
    await onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = true;
      } else {
        this.user = false;
      }
    });
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
</style>
