<template>
  <div class="preview-card stretchy-wrapper-child">
    <div class="preview-image">
      <img src="../assets/dark_folder.svg" />
    </div>
    <div class="preview-title">
      {{ fileOrFolder.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fileOrFolder: Object
  },
  computed: {
    computedImagePath() {
      console.log(this.fileOrFolder.data.mimeType);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.preview-card {
  position: relative;

  .title-bar {
    background: red;
  }

  .stretchy-wrapper-child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    font-size: 24px;
    text-align: center;
  }

  .preview-title {
    text-align: center;
  }

  img {
    position: relative;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
