<template>
  <div v-if="getPreviewFile !== null">

      <FBPreviewCardFolder :folder="getPreviewFile" v-if="getPreviewFile.isDir" />

      <FBPreviewCardAep :file="getPreviewFile" v-if="isAepFile(getPreviewFile)" />

      <FBPreviewCardPsd :file="getPreviewFile" v-if="isPsdFile(getPreviewFile)" />

      <FBPreviewCardAi :file="getPreviewFile" v-if="isIllustratorFile(getPreviewFile)" />

      <FBPreviewCardAudio :file="getPreviewFile" v-if="getPreviewFile.mimeType && isMimetype(getPreviewFile, 'audio') && !isAepFile(getPreviewFile)" />

      <FBPreviewCardImage :file="getPreviewFile" v-if="getPreviewFile.mimeType &&  isMimetype(getPreviewFile, 'image') && !isPsdFile(getPreviewFile)" />

      <FBPreviewCardVideo :file="getPreviewFile" v-if="getPreviewFile.mimeType && isMimetype(getPreviewFile, 'video')"  />

  </div>
</template>

<script>
import { mapGetters } from "vuex";

// mixins
import fileFilters from "../mixins/file-filters.js"

// preview cards
import FBPreviewCardFolder from "./preview-cards/FBPreviewCardFolder";
import FBPreviewCardAep from "./preview-cards/FBPreviewCardAep";
import FBPreviewCardPsd from "./preview-cards/FBPreviewCardPsd";
import FBPreviewCardAi from "./preview-cards/FBPreviewCardAi";
import FBPreviewCardAudio from "./preview-cards/FBPreviewCardAudio";
import FBPreviewCardImage from "./preview-cards/FBPreviewCardImage";
import FBPreviewCardVideo from "./preview-cards/FBPreviewCardVideo";
export default {
  mixins: [fileFilters],

  computed: {
    ...mapGetters(["getPreviewFile"])
  },
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

<style lang="scss">
</style>