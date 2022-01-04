<template>
  <div class="container">
    <MainSidebar />
    <MainNavbar />
    <router-view />
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";
import MainSidebar from "@/components/MainSidebar.vue";

export default {
  data() {
    return {}
  },
  components: {
    MainNavbar,
    MainSidebar
  },
};
</script>

<style>

</style>
