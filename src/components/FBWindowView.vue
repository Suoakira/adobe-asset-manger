<template>
  <div class="windowview-container row items-start">
    <VueContext ref="fb-window-view" :closeOnScroll="true">
      <template slot-scope="child">
        <!-- Only show this if .aep -->
        <li @click="revealInFinder($event, child.data)">Reveal in Finder</li>
        <!-- <li @click.prevent="">{{child.data}}</li> -->
      </template>
    </VueContext>

    

    <div
      v-for="fileOrFolder in renderFilteredFiles"
      :class="` custom-eight-cols file-col`"
      :key="fileOrFolder.nodeKey"
      @dblclick="navigate(fileOrFolder)"
      @click="updatePreviewFile(fileOrFolder)"
      @contextmenu.prevent="$refs['fb-window-view'].open($event, fileOrFolder)"
    >
    
      <FBWindowViewPreviewBucket
        :selectedFilePath="selectedFilePath"
        :class="`stretchy-wrapper ${selectedFilePath === fileOrFolder.nodeKey ? 'selected-file' : '' }`"
        :fileOrFolder="fileOrFolder"
      />
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
    FBWindowViewPreviewBucket,
    VueContext
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
  left: 269px;


  position: relative;


}

// --------------|----------------------
// aspect ratio  | padding-bottom value
//     16:9      |       56.25%
//     4:3       |       75%
//     3:2       |       66.66%
//     8:5       |       62.5%

.file-col {
  text-align: center;
  position: relative;
  // margin: 0.5%;
  cursor: default;

  &.custom-eight-cols {
    -webkit-box-flex: 0;
    flex: 0 0 12.5%;
    max-width: 12.5%;
  }
}

.stretchy-wrapper {
padding-bottom: 100%;

}

</style>
