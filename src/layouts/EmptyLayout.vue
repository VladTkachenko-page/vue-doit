<template>
  <div class="empty-layout">
    <img
      src="../assets/img/back.svg"
      alt="back"
      class="empty-layout__back"
      @click="$router.push('/')"
    />
    <img
      src="../assets/img/exit.svg"
      alt="close"
      class="empty-layout__exit"
      @click="$router.push('/')"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
.empty-layout {
  color: #fff;
}
.empty-layout__back {
  position: absolute;
  cursor: pointer;
  top: 16px;
  max-width: 32px;
  max-height: 32px;
}
.empty-layout__exit{
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 16px;
  max-width: 32px;
  max-height: 32px;
}
</style>
