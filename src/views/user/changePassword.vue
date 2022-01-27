<template>
  <UserLayout>
    <div class="change-email">
      <h2 class="change-email__title title">Change email address</h2>
      <form class="change-email__form" @submit.prevent="submit">
        <div
          class="default-input"
          :class="{
            'default-input__invalid': v$.password.$dirty && v$.password.$error,
            'default-input__success': v$.password.$dirty && !v$.password.$error,
          }"
        >
          <label for="password"> Current password </label>
          <input
            id="password"
            placeholder="Current password"
            type="password"
            v-model="v$.password.$model"
            autocomplete="off"
          />
          <div class="default-input__times">&times;</div>
          <div class="default-input__checkmark">&checkmark;</div>
          <div
            class="default-input__message"
            v-for="(error, index) of v$.password.$errors"
            :key="index"
          >
            {{ error.$message }}
          </div>
        </div>
        <div
          class="default-input"
          :class="{
            'default-input__invalid':
              v$.newPassword.$dirty && v$.newPassword.$error,
            'default-input__success':
              v$.newPassword.$dirty && !v$.newPassword.$error,
          }"
        >
          <label for="newPassword"> Password </label>
          <input
            id="newPassword"
            placeholder="Password"
            type="password"
            v-model="v$.newPassword.$model"
            autocomplete="off"
          />
          <div class="default-input__times">&times;</div>
          <div class="default-input__checkmark">&checkmark;</div>
          <div
            class="default-input__message"
            v-for="(error, index) of v$.newPassword.$errors"
            :key="index"
          >
            {{ error.$message }}
          </div>
        </div>
        <MainButtons class="sign-up__btn" type="submit"
          >Change Password</MainButtons
        >
      </form>
    </div>
  </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { getAuth, updatePassword } from "firebase/auth";
import UserLayout from "@/layouts/UserLayout.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import MainButtons from "@/components/default/MainButtons.vue";
import { getDatabase, ref, update } from "firebase/database";

export default {
  setup: () => ({ v$: useVuelidate() }),
  components: {
    UserLayout,
    MainButtons,
  },
  computed: mapGetters(["getUser"]),
  data() {
    return {
      password: "",
      newPassword: "",
    };
  },

  validations() {
    return {
      password: {
        required,
        minLength: minLength(6),
      },
      newPassword: {
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
        if (this.password !== this.getUser.password) {
          return this.$toast.error("Wrong password");
        }
        try {
          const auth = getAuth();
          updatePassword(auth.currentUser, this.newPassword)
            .then(async () => {
              const db = getDatabase();
              update(ref(db, "users/" + this.getUser.uid), {
                password: this.newPassword,
              });
              this.$router.push({
                path: "/user",
              });
            })
            .catch((error) => {
              return this.$toast.error(error);
            });
        } catch (e) {
          return this.$toast.error(e);
        }
        this.$toast.success("Your password has been changed");
      }
    },
  },
};
</script>

<style scoped>
.change-email {
  max-width: 100%;
  margin: 0 auto;
  color: #fff;
}
.change-email__title {
  margin-bottom: 45px;
}
.change-email__form {
  display: flex;
  flex-direction: column;
  max-width: 305px;
  gap: 20px;
  margin: 0 auto;
}
.change-email__form-text {
  font-size: 14px;
  margin-bottom: 6px;
}
.change-email__form-input {
  margin-bottom: 16px;
}
.change-email__form-btn {
  margin-top: 22px;
  max-width: 340px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
@media (max-width: 500px) {
  .change-email__title {
    font-size: 30px;
  }
}
</style>
