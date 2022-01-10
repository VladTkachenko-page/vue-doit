<template>
  <div
    class="home"
    :style="{
      'background-image': `url(${require('@/assets/img/main_bg.jpg')})`,
    }"
  >
    <div
      class="home__offer"
      :style="{
        'background-image': `url(${require('@/assets/img/offer_bg.svg')})`,
      }"
    >
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
// @ is an alias to /src
import MainButtons from "@/components/default/MainButtons.vue";

export default {
  name: "Home",
  components: {
    MainButtons,
  },
};
</script>
<style scoped>
.home {
  background-repeat: repeat;
  padding-top: 60px;
  padding-bottom: 30px;
}
.home__offer {
  text-align: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  padding-bottom: 410px;
  padding-top: 210px;
  margin-bottom: 25px;
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
@media (max-width: 992px) {
  .home__offer {
    padding: 150px 0 50px 0;
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
