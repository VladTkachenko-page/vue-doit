<template>
  <nav>
    <router-link v-for="(item, i) in items" :key="i" class="link" :to="item.to">
      <img class="link__icon" :src="item.src" :alt="item.title" />
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "SiteSidebar",

  data() {
    return {
      items: [
        {
          title: "knight",
          src: require("@/assets/img/001-knight.svg"),
          to: "/",
        },
        {
          title: "trophy",
          src: require("@/assets/img/002-trophy.svg"),
          to: "/",
        },
        {
          title: "network",
          src: require("@/assets/img/003-network.svg"),
          to: "/",
        },
        {
          title: "growth",
          src: require("@/assets/img/004-growth.svg"),
          to: "/",
        },
        {
          title: "megaphone",
          src: require("@/assets/img/005-megaphone.svg"),
          to: "/",
        },
        {
          title: "target",
          src: require("@/assets/img/006-target.svg"),
          to: "/",
        },
      ],
    };
  },
};
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 112px;
  height: 100vh;
  border-right: 1px solid #20252b;
}
nav .link :hover {
  transition: all 0.3s;
  transform: scale(1.2);
}
nav .link .link__icon {
  width: 32px;
  height: 32px;
  flex-grow: 0;
}
@media (max-width: 1100px) {
  nav {
    top: auto;
    bottom: 0;
    z-index: 100;
    flex-direction: row;
    align-items: center;
    background: #0f1215;
    height: 55px;
    width: 100%;
    border-top: 1px solid #20252b;
  }
  nav .link .link__icon {
    width: 22px;
    height: 22px;
    flex-grow: 0;
  }
}
</style>
