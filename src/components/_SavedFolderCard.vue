<template>
  <div class="saved-folder">{{ niceName }}</div>
</template>

<script>
export default {
  props: {
    niceName: String,
    icon: String
  }
};
</script>

<style lang="scss">
.saved-folder {
  background: pink;
  width: 100%;
  height: 30px;
  margin: 1px;
}
</style>
