<template>
  <div class="fb-image-preview">
    <div class="preview-image">
      <img :src="`file://${file.nodeKey}`" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    file: Object,
  },

  created() {
      console.log("image createdhook", this.file)
  }
};
</script>

<style lang="scss">
.fb-image-preview {
  text-align: center;


  img {
    // width: 100%;
    border-radius: 2px;
    max-height: 100%;
    max-width: 100%;
    margin: auto;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
  }


}
</style>