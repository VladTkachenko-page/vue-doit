<template>
  <div class="dimmer">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.dimmer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 499;
  width: 100%;
  height: 100%;
  background: radial-gradient(#000000, #000000ee);
}
.loader {
  width: 80px;
  height: 80px;
  background-image: url("~@/assets/img/DOIT.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  animation: spin 1s ease-in-out infinite;
  z-index: 500;
  position: fixed;
  top: 33%;
  left: 47%;
}
@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
