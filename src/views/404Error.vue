<template>
  <div class="error">
    <div class="error__code">
      <span class="error_code">404</span>
    </div>
    <div class="error__text">
      <span>
        Are you lost? <br />
        Please back to the game
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>

.error {
  width: 100%;
  height: 77vh;
  margin-top: 25px;
  font-family: "Roboto";
  font-style: normal;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: rgb(15, 18, 21);
  background: linear-gradient(
    180deg,
    rgba(20, 114, 255, 0) 0%,
    rgba(20, 114, 255, 1) 100%
  );
}

.error__code {
  font-weight: bold;
  font-size: 100px;
  line-height: 100%;
  text-align: center;
  color: #ffffff;
}

.error__text {
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
  text-align: center;
  color: #0f1215;
  padding: 20px;
}

@media (min-width: 769px) {
  .error {
    margin: 0 auto;
    font-family: "Roboto";
    font-style: normal;
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: center;
    align-items: center;
    background: rgb(15, 18, 21);
  }

  .error__code {
    font-weight: bold;
    font-size: 116px;
    line-height: 100%;
    padding: 120px;
    color: #0f1215;
    background: rgba(0, 212, 255, 1);
    background: linear-gradient(
      270deg,
      rgba(20, 114, 255, 0) 0%,
      rgba(20, 114, 255, 1) 100%
    );
    padding-top: 109px;
  }

  .error__text {
    font-family: "Roboto";
    font-weight: normal;
    font-size: 30px;
    line-height: 130%;
    text-align: left;
    color: white;
    padding: 128px 80px;
    border: 1px solid rgba(9, 9, 121, 1);
    border-image: linear-gradient(to right, #0a68f5 10%, transparent 90%);
    border-image-slice: 1;
  }
}
</style>
