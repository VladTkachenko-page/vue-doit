<template>
  <Wallet>
    <div class="withdraw">
      <div class="withdraw__methods">
        <div
          class="withdraw__method"
          v-for="item in methods"
          :key="item"
          :class="{ active: item === method }"
          @click="updateMethod(item)"
        >
          {{ item }}
        </div>
      </div>
      <form class="withdraw__form" @submit.prevent="submit">
        <div class="withdraw__form-text">Name and last name</div>
        <div
          class="default-input withdraw__form-input"
          :class="{
            'default-input__invalid': v$.name.$dirty && v$.name.$error,
            'default-input__success': v$.name.$dirty && !v$.name.$error,
          }"
        >
          <input
            id="name"
            placeholder="Nikodem Swider"
            v-model="v$.name.$model"
          />
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
        <div class="withdraw__form-text">Your email address</div>
        <div
          class="default-input withdraw__form-input"
          :class="{
            'default-input__invalid': v$.email.$dirty && v$.email.$error,
            'default-input__success': v$.email.$dirty && !v$.email.$error,
          }"
        >
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
        <div class="withdraw__form-text">Amount</div>
        <div
          class="default-input withdraw__form-input"
          :class="{
            'default-input__invalid': v$.amount.$dirty && v$.amount.$error,
            'default-input__success': v$.amount.$dirty && !v$.amount.$error,
          }"
        >
          <input
            id="amount"
            type="number"
            placeholder="$100"
            v-model="v$.amount.$model"
          />
          <div class="default-input__times">&times;</div>
          <div class="default-input__checkmark">&checkmark;</div>
          <div
            class="default-input__message"
            v-for="(error, index) of v$.amount.$errors"
            :key="index"
          >
            {{ error.$message }}
          </div>
          <div class="withdraw__doit" v-if="method === 'DOIT'">100 DOIT = 1$</div>
        </div>
        <MainButtons class="withdraw__form-btn">Withdraw</MainButtons>
      </form>
    </div>
  </Wallet>
</template>

<script>
import { mapGetters } from "vuex";
import MainButtons from "@/components/default/MainButtons.vue";
import Wallet from "@/views/user/wallet.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { getDatabase, ref, update } from "firebase/database";

export default {
  computed: mapGetters(["getUser"]),
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      method: "Paypal",
      methods: ["Paypal", "BTC", "QIWI", "DOIT"],
      name: "",
      email: "",
      amount: "",
    };
  },

  components: {
    Wallet,
    MainButtons,
  },

  validations() {
    return {
      email: {
        required,
        email,
      },
      name: {
        required,
        minLength: minLength(6),
      },
      amount: {
        required,
      },
    };
  },

  methods: {
    async submit() {
      if (this.getUser.eur < this.amount) {
        return this.$toast.error("You don't have enough funds");
      }
      if (this.method === "DOIT") {
        if (this.getUser.eur < this.amount * 100) {
          return this.$toast.error("You don't have enough funds");
        }
      }
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      } else {
        const db = getDatabase();
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        if (new Date().getDate() < 10) {
          day = "0" + new Date().getDate();
        }
        if (new Date().getMonth() + 1 < 10) {
          month = "0" + (new Date().getMonth() + 1);
        }
        const dateNow =
          day +
          "." +
          month +
          "." +
          new Date().getFullYear() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes();
        try {
          await update(
            ref(
              db,
              `users/${this.getUser.uid}/walletHistory/${new Date().getTime()}`
            ),
            {
              id: new Date().getTime(),
              date: dateNow,
              name: this.name,
              email: this.email,
              type: "Withdraw",
              method: this.method,
              amount: `$${this.amount}`,
            }
          );
          if (this.method === "DOIT") {
            await update(ref(db, "users/" + this.getUser.uid), {
              dtc: this.getUser.dtc - this.amount * 100,
            });
          } else {
            await update(ref(db, "users/" + this.getUser.uid), {
              eur: this.getUser.eur - this.amount,
            });
          }
          this.$toast.success("Withdrawal was successful");
        } catch (e) {
          this.$toast.error(e);
        }
      }
    },
    updateMethod(method) {
      this.method = method;
    },
  },
};
</script>

<style scoped>
.withdraw {
  position: relative;
  background-color: #0d1d2c;
  padding: 20px 40px;
}
.withdraw__methods {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 35px;
}
.withdraw__method {
  color: #7a8899;
  background-color: #0f1215;
  font-size: 14px;
  line-height: 100%;
  padding: 8px 17px;
  border: 1px solid #20252b;
  cursor: pointer;
}
.withdraw__method.active {
  color: #f5f5f5;
  background: linear-gradient(180deg, #2788f6 0%, #0960e0 100%);
}
.withdraw__doit {
  color: #fff;
  position: absolute;
  right: 20px;
  bottom: 10px;
}
.withdraw__form {
  max-width: 500px;
}
.withdraw__form-text {
  color: #cccdcd;
  font-weight: 700;
  margin-bottom: 5px;
}
.withdraw__form-input {
  margin-bottom: 16px;
}
.withdraw__form-input input::-webkit-outer-spin-button,
.withdraw__form-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.withdraw__form-input input[type="number"] {
  -moz-appearance: textfield;
}
.withdraw__form-btn {
  max-width: 160px;
  margin: 0 auto;
}
.default-input .default-input__checkmark,
.default-input .default-input__times {
  top: 0;
}
</style>
