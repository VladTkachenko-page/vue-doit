<template>
  <button class="button" >
    <slot>Submit</slot>
  </button>
</template>

<script>
</script>

<style>
.button {
  padding: 12px 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #2788f6 0%, #0960e0 100%);
  border-radius: 2px;
  border: 1px;
  font-family: "Rubik";
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  color: #f5f5f5;
}
.button:hover {
  cursor: pointer;
}
.button:active {
  background: linear-gradient(0deg, #03112b 0%, #0960e0 100%);
}
.button:disabled {
  background: linear-gradient(0deg, #2e2e2e 0%, #434650 100%);
  cursor: not-allowed;
}

.primary {
  background: linear-gradient(180deg, #2788f6 0%, #0960e0 100%);
  color: #f5f5f5;
  border-radius: 0;
  border: none;
}
.secondary {
  background: #1a222d;
  border-radius: 0;
  border: none;
}
.secondary:active {
  background: linear-gradient(0deg, #3f3f44, #1c1c1d 100%);
}
.block {
  width: 95%;
}
.white {
  color: white;
}
</style>
