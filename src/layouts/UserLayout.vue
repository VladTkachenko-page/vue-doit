<template>
  <div class="user">
    <div class="info">
      <div class="user-info">
        <div class="user-info__avatar">
          <img v-if="getUser.img" :src="getUser.img" alt="" />
          <img
            v-else
            src="https://assets.myket.ir/icons/large/700afe6e-e431-4e88-89d9-93d0c51e96d2_.png"
            alt=""
          />
        </div>
        <div class="user-info__data">
          <p class="user-info__name">{{ getUser.name }}</p>
          <p class="user-info__nickname">{{ getUser.login }}</p>
          <router-link class="user-info__team" to="/">{{
            getUser.team
          }}</router-link>
          <p>
            <router-link to="/">
              <img src="../assets/img/plus-circle.svg" alt="" />
            </router-link>
            <router-link to="/">
              <img src="../assets/img/mail.svg" alt="" />
            </router-link>
          </p>
        </div>
      </div>

      <div class="profile-menu">
        <ul>
          <router-link
            tag="li"
            v-for="menuItem in menuItems"
            :key="menuItem.to"
            class="profile-menu__item"
            :to="menuItem.to"
            active-class="activeBullet"
            :exact="menuItem.exact"
          >
            <li>{{ menuItem.title }}</li>
          </router-link>
        </ul>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["getUser"]),

  data() {
    return {
      menuItems: [
        { title: "Profile", to: "/user", exact: true },
        { title: "User panel", to: "/user/panel" },
        { title: "Deposit", to: "/user/wallet/deposit" },
        { title: "Edit account details", to: "/user/edit" },
        { title: "Teams", to: "/user/team" },
        { title: "Subscribe", to: "/user/subscribe" },
        { title: "Support", to: "/user/support" },
        { title: "Statistics", to: "/user/statistics" },
        { title: "Settings", to: "/user/settings" },
      ],
    };
  },
};
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 16px;
  gap: 40px;
}
.user .info {
  min-width: 250px;
  max-width: 350px;
  overflow: hidden;
  border-right: 1px solid #1a1f24;
  flex-direction: column;
}
.user .user-info {
  display: flex;
  flex-direction: column;
}
.user-info__avatar {
  width: 104px;
  height: 104px;
  background: #000;
  border-radius: 4px;
}
.user-info__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.user-data img {
  width: 40px;
  height: 40px;
}
.user-info__name {
  font-size: 16px;
  line-height: 130%;
  color: #909aa3;
  margin: 0;
  margin-top: 20px;
}
.user-info__nickname {
  font-size: 24px;
  line-height: 130%;
  color: #f5f5f5;
  margin: 5px 0;
}
.user-info__team {
  text-decoration: none;
  font-size: 16px;
  line-height: 130%;
  text-transform: uppercase;
  color: #37b7fa;
  margin: 0;
}
.profile-menu {
  display: block;
}
.profile-menu ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 20px;
}
.profile-menu__item {
  list-style-type: circle;
  line-height: 150%;
  transition: all 50ms;
  color: #fff;
  text-decoration: none;
}
.profile-menu__item::marker {
  font-size: 1.5rem;
  font-weight: bolder;
}
.profile-menu__item:hover {
  color: #37b7fa;
  list-style-type: disc;
  cursor: pointer;
}
.activeBullet {
  list-style-type: disc;
  color: #37acfa;
}
.activeBullet::marker {
  color: #37acfa;
}
@media (max-width: 900px) {
  .user {
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .user .info {
    border-right: 0px;
    min-width: auto;
  }
  .user .profile-menu {
    display: none;
  }
}
</style>
