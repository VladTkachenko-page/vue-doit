<template>
  <UserLayout>
    <div class="user-panel">
      <h2 class="user-panel__title title">User Panel</h2>
      <div class="user-panel__items">
        <router-link class="user-panel__item" to="/user"
          >My profile</router-link
        >
        <router-link class="user-panel__item" to="/user/team"
          >My Team</router-link
        >
        <router-link class="user-panel__item" to="/user/wallet/withdraw"
          >Withdraw</router-link
        >
        <router-link class="user-panel__item" to="/user/wallet/deposit"
          >Deposit</router-link
        >
        <router-link class="user-panel__item" to="/user/subscribe"
          >Subscribe</router-link
        >
        <router-link class="user-panel__item" to="/user/statistics"
          >Statistics</router-link
        >
        <router-link class="user-panel__item" to="/user/support"
          >Support</router-link
        >
        <router-link class="user-panel__item" to="/user/settings"
          >Settings</router-link
        >
        <div class="user-panel__item" @click="logout">Logout</div>
        <router-link class="user-panel__item" to="/user/game-profile"
          >Game profile</router-link
        >
      </div>
    </div>
  </UserLayout>
</template>

<script>
import UserLayout from "@/layouts/UserLayout.vue";

export default {
  methods: {
    async logout() {
      await this.$store.dispatch("logout")
      await this.$router.push('/login')
    },
  },
  components: {
    UserLayout,
  },
};
</script>

<style scoped>
.user-panel__title {
  text-align: center;
  margin-bottom: 60px;
}
.user-panel__items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 64px;
}
.user-panel__item {
  padding: 30px 15px;
  min-width: 230px;
  border: 2px solid #20252b;
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
  color: #f5f5f5;
  text-decoration: none;
}
</style>
