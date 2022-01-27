<template>
  <Wallet>
    <div class="history">
      <div class="history__items" v-if="getUser.walletHistory">
        <div class="history__item gray">
          <div class="history__item-date">Date</div>
          <div class="history__item-type">Type</div>
          <div class="history__item-amount">Amount</div>
          <div class="history__item-method">Method</div>
        </div>
        <div
          class="history__item"
          v-for="(item, index) in getUser.walletHistory"
          :key="index"
          :class="{ deposit: item.type === 'Deposit' }"
        >
          <div class="history__item-date">{{ item.date }}</div>
          <div class="history__item-type">{{ item.type }}</div>
          <div class="history__item-amount">{{ item.amount }}</div>
          <div class="history__item-method">{{ item.method }}</div>
        </div>
      </div>
      <div class="history__not-found" v-if="!getUser.walletHistory">
        History not found
      </div>
    </div>
  </Wallet>
</template>

<script>
import { mapGetters } from "vuex";
import Wallet from "@/views/user/wallet.vue";

export default {
  computed: mapGetters(["getUser"]),
  components: {
    Wallet,
  },
};
</script>

<style scoped>
.history__item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 5px;
  background-color: red;
  margin-bottom: 5px;
  color: #fff;
}
.history__item.deposit {
  background-color: green;
}
.history__item.gray {
  background-color: rgb(66, 66, 66);
}
.history__not-found {
  text-align: center;
  color: red;
}

@media (max-width: 700px) {
  .history__item {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .history__item-type {
    display: none;
  }
}
@media (max-width: 550px) {
  .history__item {
    grid-template-columns: 1fr 1fr;
  }
  .history__item-method {
    display: none;
  }
}
</style>
