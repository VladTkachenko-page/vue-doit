<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script>
import MainLayout from "@/layouts/MainLayout.vue";

export default {
  name: "app",
  components: {
    MainLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap");
body {
  font-family: "Rubik", sans-serif;
  background-color: #0f1215;
}
.container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 15px 0 125px;
}
@media (max-width: 992px) {
  .container {
    padding: 0 15px 40px;
  }
}
</style>
