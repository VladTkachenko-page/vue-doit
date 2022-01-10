,
<template>
  <div class="verify">
    <div class="logo">
      <img src="../assets/img/DOIT.png" alt="logo" />
    </div>
    <p class="verify__title">
      You registered on
      <router-link class="verify__link" to="/"> doit.gg </router-link>

      to&nbsp;continue verify your email
    </p>
    <p>
      <MainButtons class="forgot__btn" type="submit">Verify email</MainButtons>
    </p>
    <p class="verify__text">
      This is an automated email. <br />
      If you recieved it in error, no action is required
    </p>
  </div>
</template>

<script>
import MainButtons from "@/components/default/MainButtons.vue";

export default {
  data() {
    return {};
  },

  components: {
    MainButtons,
  },

  methods: {},
};
</script>

<style scoped>
.verify {
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 320px;
}
.verify__title {
  text-align: center;
  font-size: 24px;
  line-height: 150%;
}
.verify__text {
  text-align: center;
  line-height: 150%;
  font-size: 14px;
  color: #627ca3;
}
.verify__btn {
  width: 100%;
}
.verify__link {
  text-decoration: none;
  color: #0a68f5;
}
.logo img {
  width: 88px;
  height: 80px;
}
</style>
