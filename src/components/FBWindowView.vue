<template>
  <div class="windowview-container row items-start stretchy-wrapper">
    <VueContext ref="fb-window-view" :closeOnScroll="true">
      <template slot-scope="child">
        <!-- Only show this if .aep -->
        <li @click="revealInFinder($event, child.data)">Reveal in Finder</li>
        <!-- <li @click.prevent="">{{child.data}}</li> -->
      </template>
    </VueContext>

    <div
      v-for="fileOrFolder in renderFilteredFiles"
      :class="`col-2 ${selectedFilePath === fileOrFolder.nodeKey ? 'selected-file' : '' }`"
      :key="fileOrFolder.nodeKey"
      @dblclick="navigate(fileOrFolder)"
      @click="updatePreviewFile(fileOrFolder)"
      @contextmenu.prevent="$refs['fb-window-view'].open($event, fileOrFolder)"
    >
      <FBWindowViewPreviewBucket :fileOrFolder="fileOrFolder" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueContext } from "vue-context";
import fs from "fs-extra";
import _ from "lodash";

// open in finder replace with shell
import cmd from "node-cmd";

import FBWindowViewPreviewBucket from "./FBWindowViewPreviewBucket";
// mixins
import fileFilters from "../mixins/file-filters.js";

export default {
  data() {
    return {
      selectedFilePath: null
    };
  },
  mixins: [fileFilters],
  components: {
    FBWindowViewPreviewBucket
  },
  methods: {
    navigate(fileOrFolder) {
      this.$store.dispatch("navigatePath", fileOrFolder.nodeKey);
    },

    updatePreviewFile(fileOrFolder) {
      if (this.selectedFilePath === fileOrFolder.nodeKey) {
        this.setPreviewFile(null);
      } else {
        this.setPreviewFile(fileOrFolder);
      }
    },

    setPreviewFile(update) {
      this.selectedFilePath = update ? update.nodeKey : null;
      this.$store.dispatch("setPreviewFile", update);
    },

    revealInFinder($event, file) {
      console.log(event, file);
      if (fs.existsSync(file.nodeKey)) {
        cmd.run(`open -R ${file.nodeKey.replace(/(\s+)/g, "\\$1")}`);
      } else {
        console.log(
          "FileBrowserWindow.vueL",
          `${file.nodeKey} is not a valid path`
        );
      }
    },

    // filters
    filterSearchInput(renderedFilesAndFolders) {
      return renderedFilesAndFolders.filter(file => {
        // return file.label.toLowerCase().includes(this.getBrowserSearch);
      });
    },

    /**
     * @desc will filter files based on desired types/extensions  8 Nov 2019
     * @author Stephen Courtier  stephen@integnity.com
     */
    filterFileExtensions(file) {
      const { mimeType, isDir } = file;
      if (isDir) {
        return true;
      } else if (
        mimeType &&
        mimeType.includes("image") &&
        file.label.substr(file.label.length - 4) !== ".dmg"
      ) {
        return true;
      } else if (mimeType && mimeType.includes("video")) {
        return true;
      } else if (mimeType && mimeType.includes("audio")) {
        return true;
      } else if (this.isAepFile(file)) {
        return true;
      } else if (this.isPsdFile(file)) {
        return true;
      } else if (this.isIllustratorFile(file)) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getFilesAndFolders",
      "getPreviewFile",
      "getBrowserSearchTerm"
    ]),
    renderFilteredFiles() {
      //  filter file extensions
      let filteredFilesAndFolders = this.getFilesAndFolders.filter(file => {
        return (
          this.filterFileExtensions(file) &&
          file.label.includes(this.getBrowserSearchTerm)
        );
      });

      (this.filteredFilesAndFolders = filteredFilesAndFolders.sort((a, b) => {
        // sort label a-z
        if (this.getFilter === "a-z") {
          return a.label.localeCompare(b.label);
        }
      })),
        // sorts folders on top of files
        (this.filteredFilesAndFolders = this.filteredFilesAndFolders.sort(
          (a, b) => {
            return a.isDir === b.isDir ? 0 : a.isDir ? -1 : 1;
          }
        ));

      return this.filteredFilesAndFolders;
    }
  },
  watch: {
    getPreviewFile() {
      console.log("__preview", this.getPreviewFile);
    }
  }
};
</script>

<style lang="scss" scoped>
.windowview-container {
  width: 100%;
  max-width: 780px;
  top: 40px;
  height: 100%;
  background: purple;

  .selected-file {
    background: yellow;
  }
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
