<template>
  <div class="file-input">
    <div class="file-input__wrap">
      <div class="file-input__name">{{ filename.substr(0, 30) || name }}</div>
      <div class="file-input__btn" @click.prevent="onPickFile">UPLOAD</div>
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked"
      />
    </div>
    <div class="file-input__preview" v-if="!disablePreview">
      <img
        :src="
          fileurl ||
          img ||
          'https://solovero.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
        "
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "img", "index", "disablePreview"],
  data() {
    return {
      filename: "",
      fileurl: "",
      file: null,
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    async onFilePicked(event) {
      const files = event.target.files;
      const fileReader = new FileReader();
      this.file = files[0];
      this.filename = files[0].name;
      if (this.filename.indexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      fileReader.onload = (e) => {
        this.fileurl = e.target.result;
      };
      fileReader.readAsDataURL(files[0]);
      try {
        this.$emit("uploadFile", this.file);
      } catch (e) {
        this.$toast.error(e);
      }
    },
  },
};
</script>

<style scoped>
.file-input__wrap {
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.file-input__name {
  border: 2px solid #20252b;
  border-radius: 4px;
  padding: 12px;
  max-width: 340px;
  width: 100%;
  margin-right: 16px;
}
.file-input__btn {
  max-width: 160px;
  width: 100%;
  text-align: center;
  background-color: #1a222d;
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 700;
  padding: 16px 0;
  cursor: pointer;
}
.file-input__preview {
  margin-top: 5px;
}
.file-input__preview img {
  width: 128px;
  height: 128px;
  object-fit: cover;
}
</style>
