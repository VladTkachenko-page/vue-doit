<template>
  <UserLayout>
    <div class="support">
      <h2 class="support__title title">Support</h2>
      <form class="support__form" @submit.prevent="submit">
        <div
          class="default-input"
          :class="{
            'default-input__invalid': v$.name.$dirty && v$.name.$error,
            'default-input__success': v$.name.$dirty && !v$.name.$error,
          }"
        >
          <input id="name" placeholder="Name" v-model="v$.name.$model" />
          <div class="default-input__times">&times;</div>
          <div class="default-input__checkmark">&checkmark;</div>
          <div
            class="default-input__message"
            v-for="(error, index) of v$.name.$errors"
            :key="index"
          >
            {{ error.$message }}
          </div>
        </div>
        <div
          class="default-input"
          :class="{
            'default-input__invalid': v$.topic.$dirty && v$.topic.$error,
            'default-input__success': v$.topic.$dirty && !v$.topic.$error,
          }"
        >
          <input id="topic" placeholder="Topic" v-model="v$.topic.$model" />
          <div class="default-input__times">&times;</div>
          <div class="default-input__checkmark">&checkmark;</div>
          <div
            class="default-input__message"
            v-for="(error, index) of v$.topic.$errors"
            :key="index"
          >
            {{ error.$message }}
          </div>
        </div>
        <DefaultTextarea
          type="text"
          placeholder="Your problem..."
          :fail="v$.problem.$dirty && v$.problem.$error"
          :success="v$.problem.$dirty && !v$.problem.$error"
          :errorMessage="v$.problem.$errors"
          @updateField="updateProblem"
        />
        <MainButtons class="support__btn">Submit</MainButtons>
      </form>
    </div>
  </UserLayout>
</template>

<script>
import MainButtons from "@/components/default/MainButtons.vue";
import DefaultTextarea from "@/components/default/DefaultTextarea.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import UserLayout from "@/layouts/UserLayout.vue";
import { getDatabase, ref, update } from "firebase/database";
import { mapGetters } from "vuex";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      topic: "",
      problem: "",
    };
  },

  validations() {
    return {
      name: {
        required,
        minLength: minLength(2),
      },
      topic: {
        required,
      },
      problem: {
        required,
        minLength: minLength(20),
      },
    };
  },

  computed: mapGetters(["getUser"]),

  components: {
    UserLayout,
    MainButtons,
    DefaultTextarea,
  },

  methods: {
    async submit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      } else {
        const db = getDatabase();
        try {
          await update(
            ref(
              db,
              `users/${this.getUser.uid}/support/${new Date().getTime()}`
            ),
            {
              id: new Date().getTime(),
              name: this.name,
              topic: this.topic,
              problem: this.problem,
            }
          );
        } catch (e) {
          this.$toast.error(e);
        }
        this.$toast.success("Application accepted");
      }
    },
    updateProblem(field) {
      this.problem = field;
    },
    uploadImg(img) {
      console.log(1);
      console.log("img: ", img);
    },
  },
};
</script>

<style scoped>
.support {
  max-width: 100%;
  margin: 0 auto;
}
.support__title {
  text-align: center;
  margin-bottom: 40px;
}
.support__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 510px;
}
.support__input {
  margin-bottom: 9px;
}
.support__input:last-child {
  max-height: 500px;
}
.support__btn {
  max-width: 250px;
  position: relative;
  left: 50%;
  margin-top: 25px;
  transform: translateX(-50%);
}
.default-input .default-input__checkmark,
.default-input .default-input__times {
  top: 0;
}
@media (max-width: 600px) {
  .support__form {
    max-width: 300px;
  }
  .default-input .input {
    max-width: 266px;
  }
}
</style>
