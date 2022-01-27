<template>
  <div
    class="default-input"
    :class="{
      'default-input__success': success,
      'default-input__invalid': fail,
    }"
  >
    <textarea
      class="input"
      :placeholder="placeholder"
      v-model="input"
      @input="updateField"
    />
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
.input:focus {
  border-color: #627ca3;
  background-color: #121f33;
}
.input:active {
  border-color: #185ec7;
  background-color: #16263d;
}
.input:disabled {
  border: none;
  color: #98a4b5;
  background-color: #121f33;
}
.input::placeholder {
  color: #627ca3;
}
.default-input .default-input__checkmark,
.default-input .default-input__times {
  top: 0;
}
.default-input__invalid textarea {
  border: 1px solid #b83333;
  border-radius: 2px;
}
.default-input__success textarea {
  border: 1px solid #4cb725;
  border-radius: 2px;
}
.input.secondary {
  background: #0f1215;
  border: 2px solid #20252b;
}
.input.secondary .input::placeholder {
  color: #cccdcd;
}
.input.secondary .input:focus {
  border-color: #363e48;
  background-color: #13171b;
}
@media (max-width: 600px) {
  .default-input .input {
    max-width: 266px;
  }
}
</style>
