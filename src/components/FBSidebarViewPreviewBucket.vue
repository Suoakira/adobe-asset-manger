<template>
  <div class="sb-preview-container">
    <FBPreviewCardImage :file="fileOrFolder" />

    <FBPreviewCardVideo
      :file="fileOrFolder"
      v-if="fileOrFolder.mimeType && isMimetype(fileOrFolder, 'video')"
    />
  </div>
</template>

<script>
// mixins
import fileFilters from "../mixins/file-filters.js";

// previews cards
import FBPreviewCardImage from "./preview-cards/FBPreviewCardImage";
import FBPreviewCardVideo from "./preview-cards/FBPreviewCardVideo";

export default {
  props: {
    fileOrFolder: Object
  },
  mixins: [fileFilters],
  components: {
    FBPreviewCardImage,
    FBPreviewCardVideo
  }
};
</script>

<style lang="scss" scoped>
.sb-preview-container {
  width: 100%;
  height: 100%;
  position: relative;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%)
}
</style>
