,
<template>
  <div class="sign-up">
    <div class="logo">
      <img src="../assets/img/DOIT.png" alt="logo" />
    </div>
    <h2 class="sign-up__title">Sign up 2/2</h2>
    <form autocomplete="off" @submit.prevent="submit">
      <div
        class="default-input"
        :class="{
          'default-input__invalid': v$.login.$dirty && v$.login.$error,
          'default-input__success': v$.login.$dirty && !v$.login.$error,
        }"
      >
        <label for="login"> Username </label>
        <input
          id="login"
          placeholder="BestPlayerInTheWorld2020"
          v-model="v$.login.$model"
        />
        <div class="default-input__times">&times;</div>
        <div class="default-input__checkmark">&checkmark;</div>
        <div
          class="default-input__message"
          v-for="(error, index) of v$.login.$errors"
          :key="index"
        >
          {{ error.$message }}
        </div>
      </div>
      <div
        class="default-country-select"
        :class="{
          'default-country-select__invalid':
            v$.country.$dirty && v$.country.$error,
          'default-country-select__success':
            v$.country.$dirty && !v$.country.$error,
        }"
      >
        <label for="country-select" class="control-label"> Country </label>
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
      <DatePicker
        title-position="left"
        is-dark
        v-model="date"
        :masks="masks"
        class="default-input"
        :class="{
          'default-input__invalid': v$.date.$dirty && v$.date.$error,
          'default-input__success': v$.date.$dirty && !v$.date.$error,
        }"
        :max-date="this.thirteenDate"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <label for="date"> Date of birth </label>
          <input
            id="date"
            class="rounded"
            :value="inputValue"
            v-on="inputEvents"
            placeholder="dd-mm-yyyy"
          />
          <svg
            class="default-input__icon"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4167 3.66708H4.58333C3.57081 3.66708 2.75 4.4879 2.75 5.50042V18.3338C2.75 19.3463 3.57081 20.1671 4.58333 20.1671H17.4167C18.4292 20.1671 19.25 19.3463 19.25 18.3338V5.50042C19.25 4.4879 18.4292 3.66708 17.4167 3.66708Z"
              stroke="#627CA3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.6664 1.83292V5.49959"
              stroke="#627CA3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.33356 1.83292V5.49959"
              stroke="#627CA3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.75 9.16708H19.25"
              stroke="#627CA3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div
            class="default-input__message"
            v-for="(error, index) of v$.login.$errors"
            :key="index"
          >
            {{ error.$message }}
          </div>
        </template>
      </DatePicker>
      <div class="terms">
        <label for="signup" class="default-checkbox">
          <input
            id="signup"
            class="default-checkbox__input"
            type="checkbox"
            v-model="checked"
            :checked="checked"
            @change="v$.checked.$touch()"
          />
          <span class="default-checkbox__box"></span
          ><span class="default-checkbox__label sign-up__label"
            >I’m have at least 13 years of age and agree to the
            <router-link class="sign-up__link" to="/termsofuse"
              >terms of service</router-link
            >
          </span>
        </label>
        <div
          class="default-checkbox__message"
          :class="{
            'default-checkbox__message__invalid':
              v$.checked.$dirty && v$.checked.$error,
          }"
        >
          You must agree to the terms of service
        </div>
      </div>

      <MainButtons class="sign-up__btn" type="submit"
        >Create an account</MainButtons
      >
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import MainButtons from "@/components/default/MainButtons.vue";
import { DatePicker } from "v-calendar";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      login: "",
      country: "",
      checked: false,
      date: null,
      thirteenDate: new Date().setFullYear(new Date().getFullYear() - 13),
      masks: {
        input: "DD-MM-YYYY",
      },
    };
  },

  components: {
    MainButtons,
    DatePicker,
  },

  validations() {
    return {
      login: {
        required,
        minLength: minLength(3),
      },
      country: {
        required,
      },
      checked: {
        required,
        checked(val) {
          return val;
        },
      },
      date: {
        required,
      },
    };
  },

  methods: {
    async submit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const user = {
        login: this.login,
        country: this.country,
        email: this.$route.params.email,
        password: this.$route.params.password,
        birthday: this.date,
      };
      try {
        await this.$store.dispatch("register", user);
        alert("Вы успешно зарегистрировались");
        this.$router.push("/");
      } catch (e) {
        const eMessage = e.message;
        alert(eMessage);
      }
    },
  },
  mounted() {
    let options = document.querySelectorAll("option");
    options.forEach((item) => {
      if (item.textContent.length > 25)
        item.textContent = item.textContent.substring(0, 25) + "...";
    });
    console.log(this.$route.params);
    if (Object.keys(this.$route.params).length === 0) {
      this.$router.push("/signup");
    }
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
.sign-up__label {
  max-width: 185px;
}
form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 25px;
}
.logo img {
  width: 88px;
  height: 80px;
}
.control-label {
  font-size: 14px;
}
.terms {
  min-width: 264px;
}
.default-input__icon {
  position: absolute;
  padding: 9px;
  right: 0;
}
</style>
