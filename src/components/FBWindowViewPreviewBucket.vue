<template>
<div>
    <div class="preview-container">
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
    <div class="title">
        {{fileOrFolder.label}}
    </div>
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
      selectedFilePath: null
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
    FBPreviewCardVideo,
  },
};
</script>

<style lang="scss" scoped>

.preview-container {
  position: absolute;
  width: 80%;

  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // width: 100%;
  // height: 100%;
  max-height: 100%;
  max-width: 100%;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background:  yellow;
  // border: green 2px solid;
}
</style>
