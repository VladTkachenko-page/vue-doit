,
<template>
  <div class="forgot">
    <div class="logo">
      <img src="../assets/img/DOIT.png" alt="logo" />
    </div>
    <h2 class="forgot__title">Forgot password</h2>
    <form autocomplete="off" @submit.prevent="submit">
      <div
        class="default-input"
        :class="{
          'default-input__invalid': v$.email.$dirty && v$.email.$error,
          'default-input__success': v$.email.$dirty && !v$.email.$error,
        }"
      >
        <label for="email"> Username or Email </label>
        <input
          id="email"
          placeholder="google@gmail.com"
          v-model="v$.email.$model"
        />
        <div class="default-input__times">&times;</div>
        <div class="default-input__checkmark">&checkmark;</div>
        <div
          class="default-input__message"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
        >
          {{ error.$message }}
        </div>
      </div>
      <MainButtons class="forgot__btn" type="submit">Reset password</MainButtons>
    </form>
    <p>
      <router-link class="forgot__link" to="/login">Back to login</router-link>
    </p>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import MainButtons from "@/components/default/MainButtons.vue";

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
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
    },
  },
};
</script>

<style scoped>
.forgot {
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 274px;
  min-height: 572px;
}
.forgot__title {
  font-size: 32px;
  font-weight: 700;
}
.forgot__btn {
  width: 100%;
}
.forgot__link {
  text-decoration: none;
  color: #0a68f5;
}
form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 1.5rem;
  max-width: 264px;
}
.logo img {
  width: 88px;
  height: 80px;
}
</style>
