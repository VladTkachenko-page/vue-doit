<template>
  <UserLayout>
    <div class="wallet">
      <div class="wallet__nav">
        <div class="wallet__profile">
          <div class="wallet__profile-img">
            <img :src="getUser.img" alt="" />
          </div>
          <div class="wallet__profile-info">
            <div class="wallet__profile-name">{{ getUser.login }}</div>
            <div class="wallet__profile-wallet">
              BALANCE: ${{ getUser.eur }}
            </div>
            <div class="wallet__profile-wallet">
              DOIT POINTS: {{ getUser.dtc }}
            </div>
          </div>
        </div>
        <div class="wallet__links">
          <router-link
            v-for="menuItem in menuItems"
            :key="menuItem.to"
            class="wallet__link"
            :to="menuItem.to"
            active-class="active"
            :exact="menuItem.exact"
          >
            {{ menuItem.title }}
          </router-link>
        </div>
      </div>
      <slot></slot>
    </div>
  </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";
import UserLayout from "@/layouts/UserLayout.vue";

export default {
  computed: mapGetters(["getUser"]),
  data() {
    return {
      menuItems: [
        { title: "Withdraw", to: "/user/wallet/withdraw", exact: true },
        { title: "Deposit", to: "/user/wallet/deposit" },
        { title: "History", to: "/user/wallet/history" },
      ],
    };
  },
  components: {
    UserLayout,
  },
};
</script>

<style scoped>
.wallet {
  max-width: 100%;
  padding-bottom: 100px;
}
.wallet__nav {
  padding-top: 21px;
  padding-right: 31px;
  padding-left: 31px;
  background-color: #0d1d2c;
  margin-bottom: 40px;
}
.wallet__profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}
.wallet__profile-img img {
  max-width: 86px;
  max-height: 83px;
}
.wallet__profile-name {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 130%;
  margin-bottom: 5px;
}
.wallet__profile-wallet {
  color: #37b7fa;
}
.wallet__links {
  display: flex;
  justify-content: center;
  gap: 100px;
  color: #ababab;
  font-size: 24px;
  font-weight: 700;
  line-height: 130%;
}
.wallet__link {
  color: #fff;
  padding: 6px 36px;
  text-decoration: none;
}
.wallet__link.active {
  color: #fff;
  border-bottom: 4px solid #fff;
}
@media (max-width: 1250px) {
  .wallet {
    margin: 0 auto;
    padding-bottom: 130px;
  }
  .wallet__links {
    gap: 20px;
  }
  .wallet__link {
    padding: 6px 20px;
  }
}
@media (max-width: 700px) {
  .wallet__links {
    gap: 10px;
  }
  .wallet__link {
    padding: 6px 10px;
    font-size: 20px;
  }
}
</style>
