<template>
  <div class="fb-sidebar">
    <q-expansion-item
      expand-separator
      v-model="favTabExpanded"
      label="Saved Folders"
      caption="your saved folders"
    >
      <q-card>
        <q-card-section>
          <div v-for="savedFolder in getSavedFolders" :key="savedFolder">
            <SavedFolderCard @click="navigate(savedFolder)" :niceName="folderNicename(savedFolder)"></SavedFolderCard>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      v-model="previewExpanded"
      label="Info & Preview"
      caption="select a file to find out more info"
    >
      <q-card>
        <q-card-section>
          <FBSidebarPreview />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import fs from "fs-extra";

import SavedFolderCard from "./_SavedFolderCard";
import FBSidebarPreview from "./FBSidebarPreview";

export default {
  data() {
    return {
      text: "test",
      favTabExpanded: true,
      previewExpanded: false
    };
  },

  components: { SavedFolderCard, FBSidebarPreview },

  methods: {
    handleClickFavExpanded() {
      this.favTabExpanded = !this.favTabExpanded;
    },

    handleClickPreviewExpanded() {
      this.previewExpanded = !this.previewExpanded;
    },
    navigate(paramPath) {
      this.$store.dispatch("setBrowserPath", paramPath);
      if (fs.existsSync(paramPath)) {
        this.$store.dispatch("retrieveFolderContents", paramPath);
      }
    },

    folderNicename(path) {
      
      const splitPath = path.split("/");

      return splitPath[splitPath.length - 1];
    }
  },
  computed: {
    ...mapGetters(["getSavedFolders"])
  },

  created() {
    this.$root.$on("expandPreview", value => {
      console.log("fired");
      this.previewExpanded = value;
    });
  },
  watch: {
    previewExpanded() {
      console.log("expanded preview", this.previewExpanded);
    }
  },
  beforeDestroy() {
    this.$root.$off("expandPreview");
  }
};
</script>

<style lang="scss" scoped>
.fb-sidebar {
  position: fixed;
  left: 780px;
  top: 0;
  background: blue;
  width: 220px;
  height: 100%;

  //   .accordion-fav-folder {
  //     padding: 0;
  //   }

  //   .accordion-file-preview {
  //     padding: 0;
  //   }
  //   .fav-folders-accordion {
  //     .p-1 {
  //       background: $background-sb-file-browser;
  //     }
  //     .tab-btn {
  //       cursor: pointer;
  //       position: relative;
  //       background: $background-sb-file-browser;
  //       border: none;
  //       box-shadow: none;
  //       height: 30px;
  //       &.extra-pad {
  //         margin-top: 20px;
  //       }
  //     }
  //     .tab-header {
  //       opacity: 0.35;
  //       font-weight: 700;
  //       font-size: 10px;
  //       color: #ffffff;
  //       text-decoration: none;
  //       margin-left: 8px;
  //     }
  //     .expand-icon {
  //       opacity: 0.35;

  //       color: white !important;
  //       position: absolute;
  //       top: 50%;
  //       /* left: 0; */
  //       transform: translateY(-50%);
  //       right: 2%;
  //     }

  //     .preview-tab {
  //       position: fixed;
  //       width: 220px;
  //       /* width: 100%; */
  //       z-index: 2;
  //     }

  //     .file-preview-container {
  //       top: 38px;
  //       position: relative;
  //       height: 450px;
  //       max-height: 460px;
  //       overflow: scroll;
  //     }
  //   }

  //   // overide:bootstrap
  //   .card {
  //     border: none;
  //     border-radius: 0;
  //     background: #272727;
  //     margin-bottom: 0 !important;
  //   }

  //   .card-header {
  //     /* padding: 0.75rem 1.25rem; */
  //     margin-bottom: 0;
  //     background-color: rgba(0, 0, 0, 0.03);
  //     border: none !important;
  //     border-radius: none !important;
  //   }
}
</style>
