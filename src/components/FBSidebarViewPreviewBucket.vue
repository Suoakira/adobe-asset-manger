<template>
  <div class="sb-preview-container">
    <FBSidebarRightPreviewCardImage :file="fileOrFolder" />

    <FBSidebarRightPreviewCardVideo
      :file="fileOrFolder"
      v-if="fileOrFolder.mimeType && isMimetype(fileOrFolder, 'video')"
    />
  </div>
</template>

<script>
// mixins
import fileFilters from "../mixins/file-filters.js";

// previews cards
import FBSidebarRightPreviewCardImage from "./preview-cards/FBSidebarRightPreviewCardImage";
import FBSidebarRightPreviewCardVideo from "./preview-cards/FBSidebarRightPreviewCardVideo";

export default {
  props: {
    fileOrFolder: Object
  },
  mixins: [fileFilters],
  components: {
    FBSidebarRightPreviewCardImage,
    FBSidebarRightPreviewCardVideo
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
