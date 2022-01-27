<template>
  <UserLayout>
    <div class="settings">
      <h2 class="settings__title title">Settings</h2>
      <div class="settings__items">
        <router-link class="settings__item" to="/user/edit"
          >Edit account details</router-link
        >
        <router-link class="settings__item" to="/user/changeEmail"
          >Change email address</router-link
        >
        <router-link class="settings__item" to="/user/changePassword"
          >Change password</router-link
        >
        <router-link class="settings__item" to="/user/"
          >Close account</router-link
        >
      </div>
    </div>
  </UserLayout>

</template>

<script>
import UserLayout from "@/layouts/UserLayout.vue";

export default {
  components: {
    UserLayout,
  },
};
</script>

<style scoped>
.settings__title {
  text-align: center;
  margin-bottom: 60px;
}
.settings__items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 64px;
}
.settings__item {
  padding: 30px 15px;
  min-width: 280px;
  border: 2px solid #20252b;
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  color: #f5f5f5;
  text-decoration: none;
}
</style>
