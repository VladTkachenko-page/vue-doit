,
<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/img/DOIT.png" alt="logo" />
    </div>
    <h2 class="login__title">Login</h2>
    <form autocomplete="off" @submit.prevent="submit">
      <DefaultInput
        :id="email"
        :label="'Email'"
        :placeholder="'google@gmail.com'"
        :invalid="v$.email.$dirty && v$.email.$error"
        :success="v$.email.$dirty && !v$.email.$error"
        :errorMessage="v$.email.$errors"
        @updateField="updateEmail"
      />
      <DefaultInput
        :id="password"
        :label="'Password'"
        :type="'password'"
        :placeholder="'Password'"
        :invalid="v$.password.$dirty && v$.password.$error"
        :success="v$.password.$dirty && !v$.password.$error"
        :errorMessage="v$.password.$errors"
        @updateField="updatePassword"
      />
      <MainButtons class="login__btn" type="submit">Login</MainButtons>
    </form>
    <p class="login__text">or signup with</p>
    <div class="social-links">
      <img
        class="icon"
        src="../assets/img/facebook-logo.svg"
        alt="facebook"
        @click="signInWith"
      />
      <img
        class="icon"
        src="../assets/img/battle-logo.svg"
        alt="battle"
        @click="signInWith"
      />
      <img
        class="icon"
        src="../assets/img/google-logo.svg"
        alt="google"
        @click="signInWith"
      />
      <img
        class="icon"
        src="../assets/img/steam-logo.svg"
        alt="steam"
        @click="signInWith"
      />
    </div>
    <router-link class="login__link" to="/forgot">Forgot password?</router-link>
    <p class="login__text">
      Don't have an account?
      <router-link class="login__link" to="signup">Sign up!</router-link>
    </p>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import MainButtons from "@/components/default/MainButtons.vue";
import DefaultInput from "@/components/default/DefaultInput.vue";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      password: "",
      isBusy: false,
      invalid: false,
      success: false,
    };
  },

  components: {
    DefaultInput,
    MainButtons,
  },

  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    };
  },

  methods: {
    async submit() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      } else {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      }
    },
    updateEmail(field) {
      this.email = field;
    },
    updatePassword(field) {
      this.password = field;
    }
  },
};
</script>

<style scoped>
.login {
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 264px;
  min-height: 572px;
}
.login__title {
  font-size: 32px;
  font-weight: 700;
}
.login__btn {
  width: 100%;
}
.login__text {
  font-size: 16px;
  color: #627ca3;
}
.login__link {
  text-decoration: none;
  color: #0a68f5;
}
form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 1.5rem;
}
.logo img {
  width: 88px;
  height: 80px;
}
.social-links {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 30px;
}
.social-links .icon {
  border: 1px solid #16263d;
  padding: 9px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  margin-left: 10px;
}
.social-links .icon:first-child {
  margin-left: 0;
}
.social-links .icon:hover {
  transform: scale(1.05);
}
</style>
