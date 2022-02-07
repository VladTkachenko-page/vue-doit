<template>
  <Wallet>
    <div class="deposit">
      <div class="deposit__methods">
        <div
          class="deposit__method"
          v-for="item in methods"
          :key="item"
          :class="{ active: item === method }"
          @click="updateMethod(item)"
        >
          {{ item }}
        </div>
      </div>
      <form class="deposit__form" @submit.prevent="submit">
        <div class="deposit__form-text">Name and last name</div>
        <DefaultInput
          class="deposit__form-input"
          :id="'name'"
          :placeholder="'Nikodem Swider'"
          :invalid="v$.name.$dirty && v$.name.$error"
          :success="v$.name.$dirty && !v$.name.$error"
          :errorMessage="v$.name.$errors"
          @updateField="updateName"
        />
        <div class="deposit__form-text" v-if="method === 'Card'">Card</div>
        <DefaultInput
          class="deposit__form-input"
          v-if="method === 'Card'"
          :id="'card'"
          :placeholder="'0000 0000 0000 0000'"
          :type="'number'"
          :invalid="v$.card.$dirty && v$.card.$error"
          :success="v$.card.$dirty && !v$.card.$error"
          :errorMessage="v$.card.$errors"
          @updateField="updateCard"
        />
        <div class="deposit__form-text">Amount</div>
        <DefaultInput
          class="deposit__form-input"
          :id="'amount'"
          :placeholder="'$100'"
          :type="'number'"
          :invalid="v$.amount.$dirty && v$.amount.$error"
          :success="v$.amount.$dirty && !v$.amount.$error"
          :errorMessage="v$.amount.$errors"
          @updateField="updateAmount"
        />
        <MainButtons class="deposit__form-btn">Deposit</MainButtons>
      </form>
    </div>
  </Wallet>
</template>

<script>
import { mapGetters } from "vuex";
import MainButtons from "@/components/default/MainButtons.vue";
import Wallet from "@/views/user/wallet.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { getDatabase, ref, update } from "firebase/database";
import DefaultInput from "@/components/default/DefaultInput.vue";

export default {
  setup: () => ({ v$: useVuelidate() }),
  computed: mapGetters(["getUser"]),
  data() {
    return {
      method: "Paypal",
      methods: ["Paypal", "BTC", "QIWI", "Card"],
      name: "",
      amount: "",
      card: "",
    };
  },

  components: {
    Wallet,
    MainButtons,
    DefaultInput,
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(6),
      },
      amount: {
        required,
      },
      card: {
        minLength: minLength(16),
        maxLength: maxLength(16),
      },
    };
  },
  methods: {
    async submit() {
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
              type: "Deposit",
              method: this.method,
              amount: `$${this.amount}`,
            }
          );
          await update(ref(db, "users/" + this.getUser.uid), {
            eur: this.getUser.eur + this.amount,
          });
          this.$toast.success("The deposit was successful");
        } catch (e) {
          this.$toast.error(e);
        }
      }
    },
    updateMethod(method) {
      this.method = method;
    },
    updateName(field){
      this.name = field;
    },
    updateCard(field){
      this.card = field;
    },
    updateAmount(field){
      this.amount = field;
    },
  },
};
</script>

<style scoped>
.deposit {
  position: relative;
  background-color: #0d1d2c;
  padding: 20px 40px;
}
.deposit__methods {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 35px;
}
.deposit__method {
  color: #7a8899;
  background-color: #0f1215;
  font-size: 14px;
  line-height: 100%;
  padding: 8px 31px;
  border: 1px solid #20252b;
  cursor: pointer;
}
.deposit__method.active {
  color: #f5f5f5;
  background: linear-gradient(180deg, #2788f6 0%, #0960e0 100%);
}
.deposit__doit {
  color: #37b7fa;
  position: absolute;
  right: 20px;
  top: 10px;
}
.deposit__form {
  max-width: 500px;
}
.deposit__form-text {
  color: #cccdcd;
  font-weight: 700;
  margin-bottom: 5px;
}
.deposit__form-input {
  margin-bottom: 16px;
}
.deposit__form-btn {
  max-width: 160px;
  margin: 0 auto;
}
.deposit__form-input::-webkit-outer-spin-button,
.deposit__form-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.deposit__form-input[type="number"] {
  -moz-appearance: textfield;
}
.default-input .default-input__checkmark,
.default-input .default-input__times {
  top: 0;
}
</style>
