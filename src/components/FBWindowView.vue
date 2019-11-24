<template>
  <div class="windowview-container row items-start stretchy-wrapper">
    <div
      v-for="fileOrFolder in getFilesAndFolders"
      class="col-3"
      :key="fileOrFolder.nodeKey"
      @click="navigate(fileOrFolder)"
    >
      <FBPreviewCard :fileOrFolder="fileOrFolder" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FBPreviewCard from "./FBPreviewCard";
import fs from "fs-extra";

export default {
  components: {
    FBPreviewCard
  },
  methods: {
    navigate(fileOrFolder) {
      let navigatePath = fileOrFolder.nodeKey;

      if (fs.existsSync(navigatePath)) {
        this.$store.dispatch("setBrowserPath", navigatePath);
        this.$store.dispatch("retrieveFolderContents", navigatePath);
      }
    }
  },
  computed: {
    ...mapGetters(["getFilesAndFolders"])
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.windowview-container {
  width: 100%;
  height: 100%;
  background: purple;
}

// aspect ratio  | padding-bottom value
// --------------|----------------------
//     16:9      |       56.25%
//     4:3       |       75%
//     3:2       |       66.66%
//     8:5       |       62.5%

.stretchy-wrapper {
  width: 100%;
  padding-bottom: 62.5%; /* 16:9 */
  position: relative;

  //   border-radius: 4px;
  //   border: 9px solid rgba(255, 0, 0, 0);
  &.selected {
    border: 9px solid #282828;
  }
}

// .stretchy-wrapper-child {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   color: white;
//   font-size: 24px;
//   text-align: center;
// }
</style>
