<template>

    <div class="sb-preview-container">

      <FBPreviewCardFolder :folder="fileOrFolder" v-if="fileOrFolder.isDir" />

      <FBPreviewCardAep :file="fileOrFolder" v-if="isAepFile(fileOrFolder)" />

      <FBPreviewCardPsd :file="fileOrFolder" v-if="isPsdFile(fileOrFolder)" />

      <FBPreviewCardAi :file="fileOrFolder" v-if="isIllustratorFile(fileOrFolder)" />

      <FBPreviewCardAudio
        :file="fileOrFolder"
        v-if="fileOrFolder.mimeType && isMimetype(fileOrFolder, 'audio') && !isAepFile(fileOrFolder)"
      />

      <FBPreviewCardImage
        :file="fileOrFolder"
        v-if="fileOrFolder.mimeType && isMimetype(fileOrFolder, 'image') && !isPsdFile(fileOrFolder)"
      />

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
import FBPreviewCardFolder from "./preview-cards/FBPreviewCardFolder";
import FBPreviewCardAep from "./preview-cards/FBPreviewCardAep";
import FBPreviewCardPsd from "./preview-cards/FBPreviewCardPsd";
import FBPreviewCardAi from "./preview-cards/FBPreviewCardAi";
import FBPreviewCardAudio from "./preview-cards/FBPreviewCardAudio";
import FBPreviewCardImage from "./preview-cards/FBPreviewCardImage";
import FBPreviewCardVideo from "./preview-cards/FBPreviewCardVideo";

export default {
  data() {
    return {


    };
  },
  props: {
    fileOrFolder: Object,

  },
  mixins: [fileFilters],
  components: {
    FBPreviewCardFolder,
    FBPreviewCardAep,
    FBPreviewCardPsd,
    FBPreviewCardAi,
    FBPreviewCardAudio,
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
