,
<template>
  <div class="sign-up">
    <div class="logo">
      <img src="../assets/img/DOIT.png" alt="logo" />
    </div>
    <h2 class="sign-up__title">Sign up 1/2</h2>
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
      <MainButtons class="sign-up__btn" type="submit">Next step</MainButtons>
    </form>
    <p class="sign-up__text">or signup with</p>
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

    <p>
      <router-link class="sign-up__link" to="/login"
        >Already have an account?</router-link
      >
    </p>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import MainButtons from "@/components/default/MainButtons.vue";
import { mapGetters } from "vuex";
import DefaultInput from "@/components/default/DefaultInput.vue";

export default {
  computed: mapGetters(["getAllUsers"]),
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      password: "",
    };
  },

  components: {
    MainButtons,
    DefaultInput,
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
      } else {
        let checkEmail = "";
        for (let key in this.getAllUsers) {
          if (this.getAllUsers[key].email === this.email) {
            checkEmail = this.getAllUsers[key].email;
          }
        }
        if (checkEmail === this.email) {
          return this.$toast.error(
            `User with this email: ${this.email} already exists`
          );
        } else {
          this.$router.push({
            name: "signUpNext",
            params: {
              email: this.email,
              password: this.password,
            },
          });
        }
      }
    },
    updateEmail(field) {
      this.email = field;
    },
    updatePassword(field) {
      this.password = field;
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchUser");
  },
};
</script>

<style scoped>
.sign-up {
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 264px;
  min-height: 572px;
}
.sign-up__title {
  font-size: 32px;
  font-weight: 700;
}
.sign-up__btn {
  width: 100%;
}
.sign-up__text {
  font-size: 16px;
  color: #627ca3;
}
.sign-up__link {
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
