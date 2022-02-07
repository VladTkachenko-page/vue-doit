<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script>
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

export default {
  name: "app",
  components: {
    MainLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&family=Rubik:wght@300;400;700&display=swap");
body {
  font-family: "Rubik", sans-serif;
  background-color: #0f1215;
}
.container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 15px 0 125px;
}
@media (max-width: 1100px) {
  .container {
    padding: 0 15px 80px;
  }
}
/* title */
.title {
  font-size: 44px;
  font-weight: 700;
  line-height: 100%;
  color: #f5f5f5;
  text-align: center;
}
.gray {
  color: #67707a;
}
.white {
  color: #fff;
}
/*default-country-select */

.default-country-select {
  min-width: 160px;
  width: 100%;
}
.default-country-select_style option {
  max-width: 260px;
}
.default-country-select_style {
  margin-top: 6px;
  padding-left: 8px;
  font-family: "Rubik";
  font-size: 16px;
  color: #627ca3;
  background: #0f1215;
  border-radius: 2px;
  border: 1px solid #1c2f4d;
  width: 100%;
  max-height: 224px;
  height: 38px;
}
.default-country-select_style::-webkit-scrollbar {
  width: 4px;
  background: #27313f;
  border-radius: 2px;
}
.default-country-select_style::-webkit-scrollbar-track {
  background: #121f33;
  border-radius: 2px;
}
.default-country-select_style::-webkit-scrollbar-thumb {
  background: #627ca3;
  border-radius: 2px;
}
.default-country-select_style::-webkit-scrollbar-thumb:hover {
  background: #5274d1;
}
.default-country-select__invalid select {
  border: 1px solid #b83333;
}
.default-country-select__success select {
  border: 1px solid #4cb725;
}
.default-country-select__message {
  display: none;
}
.default-country-select__invalid .default-country-select__message {
  display: block;
  font-size: 12px;
  color: #b83333;
  margin: 4px 0px;
}

/*default-checkbox*/ 

.default-checkbox {
  padding-left: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.default-checkbox__input {
  position: absolute;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.default-checkbox__label {
  font-size: 12px;
  line-height: 16px;
  color: #627ca3;
  margin-left: 10px;
}
.default-checkbox__message {
  display: none;
}
.default-checkbox__message__invalid {
  font-size: 12px;
  display: block;
  color: #b83333;
  margin: 4px 0px;
}
.default-checkbox__box {
  position: absolute;
  margin-left: -28px;
  width: 24px;
  height: 24px;
  background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 3.5H19C19.8284 3.5 20.5 4.17157 20.5 5V19C20.5 19.8284 19.8284 20.5 19 20.5H5C4.17157 20.5 3.5 19.8284 3.5 19V5C3.5 4.17157 4.17157 3.5 5 3.5Z' stroke='%231C2F4D'/%3E%3C/svg%3E") no-repeat;
}
.default-checkbox__input:checked + .default-checkbox__box {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 11L12 14L22 4' stroke='%23185EC7' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16' stroke='%23185EC7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}
.default-checkbox__input:focus + .default-checkbox__box {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 3.5H19C19.8284 3.5 20.5 4.17157 20.5 5V19C20.5 19.8284 19.8284 20.5 19 20.5H5C4.17157 20.5 3.5 19.8284 3.5 19V5C3.5 4.17157 4.17157 3.5 5 3.5Z' fill='%230F1929' stroke='%23294470'/%3E%3C/svg%3E");
}
.default-checkbox__input:checked:focus + .default-checkbox__box {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 11L12 14L22 4' stroke='%231472FF' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16' stroke='%231472FF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}
.default-checkbox__input:disabled + .default-checkbox__box {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z' fill='%23121519' stroke='%231D2129' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.default-checkbox__input:checked:disabled + .default-checkbox__box {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 11L12 14L22 4' stroke='%231D2129' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16' stroke='%231D2129' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
</style>
