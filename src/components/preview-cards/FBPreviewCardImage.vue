<template>
  <div class="fb-image-preview">

      <img :src="`file://${file.nodeKey}`" />

  </div>
</template>

<script>

export default {
  props: {
    file: Object,
    path: String
  },

  created() {
      console.log("image createdhook", this.file)
  }
};
</script>

<style lang="scss">
</style>