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
        <DefaultInput
          class="withdraw__form-input"
          :id="'name'"
          :placeholder="'Nikodem Swider'"
          :invalid="v$.name.$dirty && v$.name.$error"
          :success="v$.name.$dirty && !v$.name.$error"
          :errorMessage="v$.name.$errors"
          @updateField="updateName"
        />
        <div class="withdraw__form-text">Your email address</div>
        <DefaultInput
          class="withdraw__form-input"
          :id="'email'"
          :placeholder="'google@gmail.com'"
          :invalid="v$.email.$dirty && v$.email.$error"
          :success="v$.email.$dirty && !v$.email.$error"
          :errorMessage="v$.email.$errors"
          @updateField="updateEmail"
        />
        <div class="withdraw__form-text">Amount</div>
        <DefaultInput
          class="withdraw__form-input"
          :id="'amount'"
          :placeholder="'$100'"
          :type="'number'"
          :invalid="v$.amount.$dirty && v$.amount.$error"
          :success="v$.amount.$dirty && !v$.amount.$error"
          :errorMessage="v$.amount.$errors"
          @updateField="updateAmount"
        />
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
import DefaultInput from "@/components/default/DefaultInput.vue";

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
    DefaultInput,
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
    updateName(field) {
      this.name = field;
    },
    updateEmail(field) {
      this.email = field;
    },
    updateAmount(field) {
      this.amount = field;
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
.withdraw__form-btn {
  max-width: 160px;
  margin: 0 auto;
}
.default-input .default-input__checkmark,
.default-input .default-input__times {
  top: 0;
}
</style>
