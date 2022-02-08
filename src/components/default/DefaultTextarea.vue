<template>
  <div
    class="default-input"
    :class="{
      'default-input__success': success,
      'default-input__invalid': fail,
    }"
  >
    <textarea :placeholder="placeholder" v-model="input" @input="updateField" />
    <div class="default-input__times">&times;</div>
    <div class="default-input__checkmark">&checkmark;</div>
    <div
      class="default-input__message"
      v-for="(error, index) of errorMessage"
      :key="index"
    >
      {{ error.$message }}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "type",
    "placeholder",
    "success",
    "fail",
    "errorMessage",
    "field",
    "index",
  ],
  watch: {
    changes() {
      this.input = "";
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.field) {
        this.input = this.field;
      }
    }, 200);
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    updateField() {
      this.$emit("updateField", this.input);
    },
  },
};
</script>

<style scoped>
.input {
  font-family: "Rubik", sans-serif;
  outline: none;
  background-color: transparent;
  border: 1px solid #16263d;
  border-radius: 2px;
  padding: 12px 16px;
  color: #e6e6e6;
  transition: all 0.3s;
  width: 100%;
  height: 250px;
  resize: none;
  max-width: 475px;
}
.default-input {
  position: relative;
  width: 100%;
}
.default-input label {
  font-size: 14px;
  font-weight: 400;
}
.default-input textarea {
  padding: 12px 16px;
  color: #627ca3;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 250px;
  border: 1px solid #16263d;
  outline: none;
  box-sizing: border-box;
  border-radius: 2px;
  resize: none;
  background-color: #0f1215;
}
.default-input textarea::placeholder {
  font-family: "Rubik";
  font-size: 14px;
  line-height: 100%;
  color: #627ca3;
  margin: 10px 0px;
}
.default-input textarea:focus {
  color: #627ca3;
  background: #121f33;
  border: 1px solid #627ca3;
  border-radius: 2px;
}
.default-input textarea:active {
  color: #e6e6e6;
  background: #16263d;
  border: 1px solid #185ec7;
  border-radius: 2px;
}
.default-input textarea:disabled {
  color: #98a4b5;
  background: #121f33;
  border-radius: 2px;
}
.default-input textarea:-webkit-autofill {
  background-color: transparent;
}
.default-input .default-input__message {
  display: none;
}
.default-input .default-input__times {
  display: none;
}
.default-input .default-input__checkmark {
  display: none;
}
.default-input__invalid textarea {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid textarea:active {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid textarea:focus {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid .default-input__times {
  display: block;
  color: #b83333;
  position: absolute;
  font-size: 32px;
  right: 10px;
  top: 20px;
}
.default-input__invalid .default-input__message {
  display: block;
  font-size: 12px;
  color: #b83333;
  margin: 4px 0px;
}
.default-input__invalid .default-input__checkmark {
  display: none;
}
.default-input__success textarea {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success textarea:active {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success textarea:focus {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success .default-input__checkmark {
  display: block;
  color: #4cb725;
  position: absolute;
  font-size: 24px;
  right: 10px;
  top: 20px;
}
.default-input__success .default-input__times {
  display: none;
}
.default-input__success .default-input__message {
  display: none;
}
.default-input__icon {
  position: absolute;
  padding: 9px;
  right: 0;
}
.default-input .default-input__checkmark,
.default-input .default-input__times {
  top: 0;
}
@media (max-width: 600px) {
  .default-input .input {
    max-width: 266px;
  }
}
</style>
