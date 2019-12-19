<template>
  <div v-if="getPreviewFile !== null">
    <div class="preview">
      <FBPreviewCardFolder :folder="getPreviewFile" v-if="getPreviewFile.isDir" />

      <FBPreviewCardAep :file="getPreviewFile" v-if="isAepFile(getPreviewFile)" />

      <FBPreviewCardPsd :file="getPreviewFile" v-if="isPsdFile(getPreviewFile)" />

      <FBPreviewCardAi :file="getPreviewFile" v-if="isIllustratorFile(getPreviewFile)" />

      <FBPreviewCardAudio
        :file="getPreviewFile"
        v-if="getPreviewFile.mimeType && isMimetype(getPreviewFile, 'audio') && !isAepFile(getPreviewFile)"
      />

      <FBPreviewCardImage
        :file="getPreviewFile"
        v-if="getPreviewFile.mimeType &&  isMimetype(getPreviewFile, 'image') && !isPsdFile(getPreviewFile)"
      />

      <FBPreviewCardVideo
        :file="getPreviewFile"
        v-if="getPreviewFile.mimeType && isMimetype(getPreviewFile, 'video')"
      />
    </div>

    <div class="sidebar-menu-btns">
      <q-btn 
        @click="fullScreenPreview" 
        color="primary" 
        text-color="white" 
        label="Preview" 
      />
      <q-btn
        @click="saveAsFav(getPreviewFile)"
        color="primary"
        text-color="white"
        :label="folderIsSaved ? 'Un-star' : 'Star'"
      />
    </div>

    <div class="file-stats">
      <h5>File Stats</h5>

      <!-- name  -->
      <FBSidebarPreviewStatsCard label="Name" :data="getPreviewFile.label" />

      <!-- type  -->
      <FBSidebarPreviewStatsCard
        v-if="!getPreviewFile.isDir"
        label="Type"
        :data="
        `${isAepFile(getPreviewFile) ? 'After Effects file':
        isPsdFile(getPreviewFile) ? 'Photoshop file':
        isIllustratorFile(getPreviewFile) ? 'Illustrator file' :
        getPreviewFile.extension.slice(1).toUpperCase()} `
      "
      />

      <!-- image  -->
      <FBSidebarPreviewStatsCard
        v-if="!getPreviewFile.isDir && getPreviewFile.mimeType.includes('image')"
        label="Res"
        :data="dimensions(getPreviewFile.nodeKey)"
      />

      <!-- size  -->
      <FBSidebarPreviewStatsCard
        label="Size"
        :data="`${convertBytesToMegaBytes(getPreviewFile.stat.size)}mb`"
      />

      <!-- created  -->
      <FBSidebarPreviewStatsCard label="Created at" data="placeholder" />

      <!-- last updated  -->
      <FBSidebarPreviewStatsCard label="Updated at" data="placeholder" />

      <!-- path  -->
      <FBSidebarPreviewStatsCard label="Path" :data="getPreviewFile.nodeKey" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// mixins
import fileFilters from "../mixins/file-filters.js";
import utils from "../mixins/utils.js";

// preview cards
import FBPreviewCardFolder from "./preview-cards/FBPreviewCardFolder";
import FBPreviewCardAep from "./preview-cards/FBPreviewCardAep";
import FBPreviewCardPsd from "./preview-cards/FBPreviewCardPsd";
import FBPreviewCardAi from "./preview-cards/FBPreviewCardAi";
import FBPreviewCardAudio from "./preview-cards/FBPreviewCardAudio";
import FBPreviewCardImage from "./preview-cards/FBPreviewCardImage";
import FBPreviewCardVideo from "./preview-cards/FBPreviewCardVideo";

// stat card
import FBSidebarPreviewStatsCard from "./FBSidebarPreviewStatsCard";
export default {
  mixins: [fileFilters, utils],

  computed: {
    ...mapGetters(["getPreviewFile", "getSavedFolders"]),
    folderIsSaved() {
      return this.getSavedFolders.includes(this.getPreviewFile.nodeKey);
    }
  },
  components: {
    FBPreviewCardFolder,
    FBPreviewCardAep,
    FBPreviewCardPsd,
    FBPreviewCardAi,
    FBPreviewCardAudio,
    FBPreviewCardImage,
    FBPreviewCardVideo,
    FBSidebarPreviewStatsCard
  },
  methods: {
    saveAsFav(folder) {
      this.$store.dispatch("saveAsFavFolder", this.getPreviewFile);
    },

    fullScreenPreview() {
      if (!this.getPreviewFile.isDir) {
        console.log("hit");
        this.$modal.show("fullscreen-preview");
      }
    }
  }
};
</script>

<style lang="scss">
</style>