<template>
  <UserLayout>
    <div class="edit-account">
      <h2 class="edit-account__title title">Edit account details</h2>
      <form class="edit-account__items" @submit.prevent="submit">
        <DefaultInput
          :id="login"
          :label="'Username'"
          :placeholder="'Username'"
          :field="this.login"
          :invalid="v$.login.$dirty && v$.login.$error"
          :success="v$.login.$dirty && !v$.login.$error"
          :errorMessage="v$.login.$errors"
          @updateField="updateLogin"
        />
        <DefaultInput
          :id="name"
          :label="'Name'"
          :placeholder="'Name'"
          :field="this.name"
          :invalid="v$.name.$dirty && v$.name.$error"
          :success="v$.name.$dirty && !v$.name.$error"
          :errorMessage="v$.name.$errors"
          @updateField="updateName"
        />
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
        <div class="default-country-select" v-if="teams">
          <label for="team" class="control-label"> Main Team </label>
          <select
            v-model="mainTeam"
            id="team"
            className="default-country-select_style"
          >
            <option value="" selected>Other/I don’t want to talk</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="default-country-select">
          <label for="sex" class="control-label"> Sex </label>
          <select
            v-model="sex"
            id="sex"
            className="default-country-select_style"
          >
            <option value="" selected>Other/I don’t want to talk</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <DatePicker
          title-position="left"
          is-dark
          v-model="birthday"
          :masks="masks"
          class="default-input"
          :class="{
            'default-input__invalid': v$.birthday.$dirty && v$.birthday.$error,
            'default-input__success': v$.birthday.$dirty && !v$.birthday.$error,
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
              v-for="(error, index) of v$.birthday.$errors"
              :key="index"
            >
              {{ error.$message }}
            </div>
          </template>
        </DatePicker>
        <MainButtons class="sign-up__btn" type="submit"
          >Change details</MainButtons
        >
      </form>
    </div>
  </UserLayout>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import UserLayout from "@/layouts/UserLayout.vue";
import MainButtons from "@/components/default/MainButtons.vue";
import { DatePicker } from "v-calendar";
import DefaultInput from "@/components/default/DefaultInput.vue";

export default {
  setup: () => ({ v$: useVuelidate() }),
  computed: mapGetters(["getUser"]),
  components: {
    UserLayout,
    MainButtons,
    DatePicker,
    DefaultInput
  },
  async mounted() {
    let options = document.querySelectorAll("option");
    options.forEach((item) => {
      if (item.textContent.length > 25)
        item.textContent = item.textContent.substring(0, 25) + "...";
    });
    await this.getUserData();
  },
  data() {
    return {
      login: "",
      name: "",
      country: "",
      teams: "",
      mainTeam: "",
      sex: "",
      thirteenDate: new Date().setFullYear(new Date().getFullYear() - 13),
      birthday: "",
      age: "",
      masks: {
        input: "DD-MM-YYYY",
      },
    };
  },
  validations() {
    return {
      login: { required, minLength: minLength(3) },
      name: { required, minLength: minLength(2) },
      country: { required },
      birthday: { required },
    };
  },

  watch: {},
  methods: {
    async submit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      } else {
        await this.getAge();
        const user = {
          uid: this.getUser.uid,
          login: this.login,
          name: this.name,
          country: this.country,
          dateOfBirthday: this.birthday,
          birthday: `${
            this.birthday.getMonth() + 1
          }.${this.birthday.getDate()}.${this.birthday.getFullYear()}`,
          sex: this.sex,
          teams: this.teams,
          mainTeam: this.mainTeam,
          age: this.age,
        };
        this.$store.dispatch("updateUser", user);
        this.$toast.success("Account details has been changed");
        this.$router.push({
          path: "/user",
        });
      }
    },
    async getAge() {
      let now = new Date(); //Текущя дата
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
      let dob;
      if (typeof this.birthday === "string") {
        dob = new Date(
          this.birthday.split(".")[2],
          this.birthday.split(".")[0] - 1,
          this.birthday.split(".")[1]
        );
        this.birthday = dob;
      } else {
        dob = new Date(
          this.birthday.getFullYear(),
          this.birthday.getMonth(),
          this.birthday.getDate()
        ); //Дата рождения
      }
      console.log("dob: ", dob);
      let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году

      //Возраст = текущий год - год рождения
      this.age = today.getFullYear() - dob.getFullYear();
      //Если ДР в этом году ещё предстоит, то вычитаем из age один год
      if (today < dobnow) {
        this.age--;
      }
    },
    async getUserData() {
      this.id = this.getUser.id;
      this.login = this.getUser.login;
      this.name = this.getUser.name;
      this.country = this.getUser.country;
      this.sex = this.getUser.sex;
      this.birthday = this.getUser.birthday;
    },
    updateLogin(field) {
      this.login = field;
    },
    updateName(field) {
      this.name = field;
    },
  },
};
</script>

<style scoped>
.edit-account {
  max-width: 500px;
  margin: 0 auto;
  color: #fff;
}
.edit-account__items {
  display: flex;
  flex-direction: column;
  max-width: 240px;
  margin: 0 auto;
  gap: 16px;
  margin-top: 70px;
}
.edit-account__item-title {
  font-size: 14px;
  margin-bottom: 6px;
}
.default-input {
  position: relative;
  width: 100%;
}
.default-input label {
  font-size: 14px;
  font-weight: 400;
}
.default-input input {
  padding: 12px 16px;
  color: #627ca3;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 40px;
  border: 1px solid #16263d;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #0f1215;
}
.default-input input::placeholder {
  font-family: "Rubik";
  font-size: 14px;
  line-height: 100%;
  color: #627ca3;
  margin: 10px 0px;
}
.default-input input:focus {
  color: #627ca3;
  background: #121f33;
  border: 1px solid #627ca3;
  border-radius: 2px;
}
.default-input input:active {
  color: #e6e6e6;
  background: #16263d;
  border: 1px solid #185ec7;
  border-radius: 2px;
}
.default-input input:disabled {
  color: #98a4b5;
  background: #121f33;
  border-radius: 2px;
}
.default-input input:-webkit-autofill {
  background-color: transparent;
}
.default-input .default-input__message {
  display: none;
}
.default-input .default-input__times {
  display: none;
}
.default-input .default-input__checkmark {
  display: none;
}
.default-input__invalid input {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid input:active {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid input:focus {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid .default-input__times {
  display: block;
  color: #b83333;
  position: absolute;
  font-size: 32px;
  right: 10px;
  top: 20px;
}
.default-input__invalid .default-input__message {
  display: block;
  font-size: 12px;
  color: #b83333;
  margin: 4px 0px;
}
.default-input__invalid .default-input__checkmark {
  display: none;
}
.default-input__success input {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success input:active {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success input:focus {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success .default-input__checkmark {
  display: block;
  color: #4cb725;
  position: absolute;
  font-size: 24px;
  right: 10px;
  top: 20px;
}
.default-input__success .default-input__times {
  display: none;
}
.default-input__success .default-input__message {
  display: none;
}
.default-input__icon {
  position: absolute;
  padding: 9px;
  right: 0;
}
</style>
