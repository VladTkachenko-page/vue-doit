<template>
  <Loader v-if="getCheckLoading" />
  <header v-else class="main__navbar">
    <div class="menu" :class="{ 'burger-menu': showBurgerMenu }">
      <div class="burger" @click="showBurgerMenu = !showBurgerMenu">
        <img
          v-if="!showBurgerMenu"
          src="../assets/img/burger.svg"
          alt="burger_menu"
        />
        <img v-else src="../assets/img/mdi_menu.svg" alt="burger_menu" />
      </div>
      <div class="logo" @click="$router.push('/')">
        <img
          src="../assets/img/DOIT.png"
          alt="logo"
          @click="showBurgerMenu = false"
        />
      </div>
      <router-link
        v-for="item in items"
        :key="item"
        class="menu__item"
        :to="`/${item.toLowerCase()}`"
        @click="showBurgerMenu = false"
      >
        {{ item }}
      </router-link>
      <div
        class="menu__user"
        :class="{ active: userActive }"
        v-if="auth.currentUser"
        @click="userActive = !userActive"
      >
        <div class="menu__user-wrapper">
          <div class="menu__user-img">
            <img :src="getUser.img" alt="" />
          </div>
          <div class="menu__user-info">
            <div class="menu__user-name">{{ getUser.login }}</div>
            <div class="menu__user-balance">
              {{ getUser.eur }} EUR / {{ getUser.dtc }} DTC
            </div>
          </div>
        </div>
        <div class="menu__user-inner">
          <div class="menu__user-lvl">
            <span class="menu__user-lvl-text">LVL {{ getUser.lvl }}</span>
            <div class="menu__user-lvl-bar">
              <span :style="{ width: getUser.lvl + '%' }"></span>
            </div>
          </div>
          <div class="menu__user-links">
            <router-link class="menu__user-link" to="/user"
              >My profile</router-link
            >
            <router-link class="menu__user-link" to="/user/team"
              >My team</router-link
            >
            <router-link class="menu__user-link" to="/user/wallet/withdraw"
              >Withdraw</router-link
            >
            <router-link class="menu__user-link" to="/user/wallet/deposit"
              >Deposit</router-link
            >
            <router-link class="menu__user-link" to="/user/subscribe"
              >Premium</router-link
            >
            <router-link class="menu__user-link" to="/">Statistics</router-link>
          </div>
          <div class="menu__user-links">
            <router-link class="menu__user-link" to="/user/support"
              >Support</router-link
            >
            <router-link class="menu__user-link" to="/user/settings"
              >Settings</router-link
            >
            <div class="menu__user-link" @click="logout">Logout</div>
          </div>
        </div>
      </div>
      <div class="menu__btns" v-else>
        <MainButtons
          class="secondary"
          :class="{ block: showBurgerMenu }"
          @click="
            $router.push('/login');
            showBurgerMenu = false;
          "
          >Login</MainButtons
        >
        <MainButtons
          class="primary"
          :class="{ block: showBurgerMenu }"
          @click="
            $router.push('/signup');
            showBurgerMenu = false;
          "
          >Sign up</MainButtons
        >
      </div>
    </div>
  </header>
</template>

<script>
import MainButtons from "@/components/default/MainButtons.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { mapGetters } from "vuex";
import Loader from "@/components/Loader.vue";

export default {
  data() {
    return {
      items: ["Play", "News", "Games", "Shop", "Sponsorship"],
      showBurgerMenu: false,
      userActive: false,
      auth: getAuth(),
      user: {},
    };
  },
  components: {
    MainButtons,
    Loader,
  },
  watch: {
    showBurgerMenu: function () {
      if (this.showBurgerMenu) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
    $route: function () {
      this.showBurgerMenu = false;
    },
  },
  methods: {
    async logout() {
      await this.auth.signOut();
    },
  },

  async mounted() {
    await onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const uid = user.uid;
        await this.$store.dispatch("fetchUser", uid);
        await this.$store.commit("setShowloader", false);
      } else {
        this.$store.commit("setShowloader", false);
      }
    });
  },
  computed: mapGetters(["getUser", "getCheckLoading"]),
};
</script>
<style scoped>
.main__navbar {
  padding: 30px 0;
}
.logo {
  width: 72px;
  height: 64px;
}
.burger {
  display: none;
}
.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.menu .menu__item {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #e6e6e6;
  text-decoration: none;
  display: block;
  margin-left: 50px;
}
.menu .menu__item:hover {
  transition: all 0.3s;
  transform: scale(1.05);
}
.menu .menu__btns {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-width: 210px;
  margin-left: auto;
}
.logo:hover {
  transition: all 0.3s;
  transform: scale(1.05);
}
.logo img {
  width: 100%;
  height: 100%;
  background: transparent;
}
.menu__user {
  margin-left: auto;
  padding: 8px;
  background-color: #161a1f;
  position: relative;
  max-width: 210px;
  width: 100%;
  color: #fff;
}
.menu__user-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 32px;
  cursor: pointer;
}
.menu__user-wrapper::after {
  content: "";
  width: 13px;
  height: 8px;
  position: absolute;
  top: 14px;
  right: 0;
  background-image: url("~@/assets/img/user-arrow.svg");
}
.menu__user-img img {
  display: block;
  max-width: 40px;
  max-height: 40px;
  margin-right: 8px;
}
.menu__user-name {
  font-size: 14px;
  font-weight: 500;
}
.menu__user-balance {
  font-size: 12px;
  font-weight: 500;
  color: #5af;
}
.menu__user-inner {
  position: absolute;
  max-width: 226px;
  width: 100%;
  margin-top: 7px;
  left: 0px;
  z-index: 1000;
}
.menu__user-lvl {
  font-size: 10px;
  display: none;
  align-items: center;
  justify-content: space-between;
  background-color: #161a1f;
  max-width: 210px;
  width: 100%;
  padding: 8px 8px 5px;
  cursor: pointer;
}
.menu__user-lvl-text {
  min-width: 40px;
}
.menu__user-lvl-bar {
  background-color: #000;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  position: relative;
}
.menu__user-lvl-bar span {
  height: 2px;
  background-color: #fff;
  position: absolute;
}
.menu__user-links {
  text-transform: uppercase;
  background-color: #161a1f;
  width: 100%;
  display: none;
  z-index: 5;
  margin-top: 2px;
}
.menu__user-links .menu__user-link {
  display: flex;
  position: relative;
  padding: 7px 7px 7px 12px;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  color: #f5f5f5;
}
.menu__user-links .menu__user-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.menu__user-links .menu__user-link::after {
  content: "";
  width: 12px;
  height: 8px;
  position: absolute;
  right: 15px;
  top: 50%;
  background-image: url("~@/assets/img/user-arrow.svg");
  transform: translateY(-50%) rotate(-90deg);
}
.menu__user-links + .menu__user-links {
  top: 267px;
}
.menu__user-links + .menu__user-links .menu__user-link {
  color: #969ba3;
}
.menu__user.active .menu__user-lvl {
  display: flex;
}
.menu__user.active .menu__user-links {
  display: block;
}

@media (max-width: 1100px) {
  .main__navbar {
    display: block;
    padding: 0;
  }
  .menu {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .menu .menu__item {
    display: none;
  }
  .menu .menu__btns {
    display: none;
  }
  .menu__user {
    display: none;
  }
  .burger {
    width: 24px;
    height: 24px;
    z-index: 100;
    cursor: pointer;
    display: block;
  }
  .burger:hover {
    transition: all 0.3s;
    transform: scale(1.05);
  }
  .logo {
    width: 56px;
    height: 48px;
    cursor: pointer;
  }
  .burger-menu {
    transition: all 0.3s;
    overflow: auto;
    padding-top: 80px;
    margin: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: flex-start;
    background: #0f1215;
  }
  .burger-menu .menu__item {
    display: block;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    text-align: center;
    color: #f5f5f5;
    text-decoration: none;
    margin-left: 0;
  }
  .burger-menu .menu__item:hover {
    transition: all 0.3s;
    transform: scale(1.02);
  }
  .burger-menu .menu__btns {
    position: relative;
    align-items: center;
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
    margin-left: 0;
  }
  .burger-menu .logo {
    position: absolute;
    top: 10px;
    right: 24px;
  }
  .burger-menu .burger {
    position: absolute;
    top: 13px;
    left: 33px;
  }
  .burger-menu .menu__user {
    display: block;
    margin-left: 0;
    margin-top: 40px;
  }
  .menu__user-inner {
    top: -290px;
  }
}
</style>
