<template>
  <header class="main__navbar">
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
        <img src="../assets/img/DOIT.png" alt="logo" />
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
      <div class="menu__extras">
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

export default {
  data() {
    return {
      items: ["Play", "News", "Games", "Shop", "Sponsorship"],
      showBurgerMenu: false,
    };
  },
  components: {
    MainButtons,
  },
  watch: {
    showBurgerMenu: function () {
      if (this.showBurgerMenu) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
  },
};
</script>
<style scoped>
.burger {
  width: 24px;
  height: 24px;
  z-index: 100;
  cursor: pointer;
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
.logo:hover {
  transition: all 0.3s;
  transform: scale(1.05);
}
.logo img {
  width: 100%;
  height: 100%;
  background: transparent;
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
.menu .menu__extras {
  display: none;
}
.burger-menu {
  transition: all 0.3s;
  position: absolute;
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
}
.burger-menu .menu__item:hover {
  transition: all 0.3s;
  transform: scale(1.02);
}
.burger-menu .menu__extras {
  position: relative;
  align-items: center;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
}
.burger-menu .logo {
  position: absolute;
  top: 0px;
  right: 23px;
}
.burger-menu .burger {
  position: absolute;
  top: 5px;
  left: 20px;
}

@media only screen and (min-width: 993px) {
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
  }
  .menu .menu__item:hover {
    transition: all 0.3s;
    transform: scale(1.05);
  }
  .menu .menu__extras {
    display: flex;
    flex-direction: row;
    gap: 10px;
    min-width: 210px;
  }
}
</style>
