<template>
  <div class="windowview-container">
    <ul v-for="fileOrFolder in getFilesAndFolders" :key="fileOrFolder.nodeKey">
      <li>{{ fileOrFolder.label }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getFilesAndFolders"])
  }
};
</script>

<style lang="scss" scoped>
.windowview-container {
  width: 100vw;
  height: 100vh;
  background: purple;
}
</style>
