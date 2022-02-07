<template>
  <div
    class="default-input"
    :class="{
      'default-input__success': success,
      'default-input__invalid': invalid,
    }"
  >
    <label v-if="label" :for="id"> {{ label }} </label>
    <input
      :id="id"
      class="input"
      :placeholder="placeholder"
      :type="type"
      v-model="input"
      @input="updateField"
      autocomplete="off"
      :disabled="disabled"
    />
    <div
      class="default-input__times"
      v-bind:style="{ top: this.height + 'px' }"
    >
      &times;
    </div>
    <div
      class="default-input__checkmark"
      v-bind:style="{ top: this.height + 'px' }"
    >
      &checkmark;
    </div>
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
    "id",
    "type",
    "placeholder",
    "success",
    "invalid",
    "errorMessage",
    "field",
    "index",
    "label",
    "disabled",
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
    if (this.label) {
      this.height = 20;
    }
  },
  data() {
    return {
      input: "",
      height: 0,
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
.default-input {
  position: relative;
  width: 100%;
}
.default-input label {
  font-size: 14px;
  font-weight: 400;
}
.default-input input {
  padding: 12px 16px;
  color: #627ca3;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 40px;
  border: 1px solid #16263d;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #0f1215;
}
.default-input input::placeholder {
  font-family: "Rubik";
  font-size: 14px;
  line-height: 100%;
  color: #627ca3;
  margin: 10px 0px;
}
.default-input input:focus {
  color: #627ca3;
  background: #121f33;
  border: 1px solid #627ca3;
  border-radius: 2px;
}
.default-input input:active {
  color: #e6e6e6;
  background: #16263d;
  border: 1px solid #185ec7;
  border-radius: 2px;
}
.default-input input:disabled {
  color: #98a4b5;
  background: #121f33;
  border-radius: 2px;
}
.default-input input:-webkit-autofill {
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
.default-input__invalid input {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid input:active {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__invalid input:focus {
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
.default-input__success input {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success input:active {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.default-input__success input:focus {
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
.default-input input::-webkit-outer-spin-button,
.default-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.default-input input[type="number"] {
  -moz-appearance: textfield;
}
</style>
