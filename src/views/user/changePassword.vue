<template>
  <UserLayout>
    <div class="change-email">
      <h2 class="change-email__title title">Change Password</h2>
      <form class="change-email__form" @submit.prevent="submit">
        <DefaultInput
          :id="'password'"
          :label="'Current Password'"
          :type="'password'"
          :placeholder="'Current Password'"
          :invalid="v$.password.$dirty && v$.password.$error"
          :success="v$.password.$dirty && !v$.password.$error"
          :errorMessage="v$.password.$errors"
          @updateField="updatePassword"
        />
        <DefaultInput
          :id="'newPassword'"
          :label="'Password'"
          :type="'password'"
          :placeholder="'Password'"
          :invalid="v$.newPassword.$dirty && v$.newPassword.$error"
          :success="v$.newPassword.$dirty && !v$.newPassword.$error"
          :errorMessage="v$.newPassword.$errors"
          @updateField="updateNewPassword"
        />
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
import DefaultInput from "@/components/default/DefaultInput.vue";

export default {
  setup: () => ({ v$: useVuelidate() }),
  components: {
    UserLayout,
    MainButtons,
    DefaultInput,
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
          await updatePassword(auth.currentUser, this.newPassword)
            .then(async () => {
              const db = getDatabase();
              update(ref(db, "users/" + this.getUser.uid), {
                password: this.newPassword,
              });
              this.$router.push({
                path: "/user",
              });
              this.$toast.success("Your password has been changed");
            })
            .catch((error) => {
              return this.$toast.error(error);
            });
        } catch (e) {
          return this.$toast.error(e);
        }
      }
    },
    updatePassword(field) {
      this.password = field;
    },
    updateNewPassword(field) {
      this.newPassword = field;
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
