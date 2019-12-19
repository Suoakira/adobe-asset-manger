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
      v-for="fileOrFolder in renderFilteredFiles(getFilesAndFolders)"
      class="col-2"
      :key="fileOrFolder.nodeKey"
      @click="navigate(fileOrFolder)"
    	@contextmenu.prevent="$refs['fb-window-view'].open($event, fileOrFolder)"
    >
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueContext } from "vue-context";
import fs from "fs-extra";
import _ from "lodash";

// open in finder replace with shell
import cmd from 'node-cmd';

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
    return {};
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
		VueContext,

  },
  methods: {
    navigate(fileOrFolder) {
      // if not directory show preview file
      !fileOrFolder.isDir &&
        this.$store.dispatch("setPreviewFile", fileOrFolder);

      let navigatePath = fileOrFolder.nodeKey;

      if (fs.existsSync(navigatePath)) {
        this.$store.dispatch("setBrowserPath", navigatePath);
        this.$store.dispatch("retrieveFolderContents", navigatePath);
      }
    },

    revealInFinder($event, file) {
      console.log(event, file)
			if (fs.existsSync(file.nodeKey)) {
			cmd.run(`open -R ${file.nodeKey.replace(/(\s+)/g, '\\$1')}`);
			} else {
				console.log("FileBrowserWindow.vueL", `${file.nodeKey} is not a valid path`)
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
    },

    renderFilteredFiles: _.throttle(
      function(paramFilesAndFolders) {
        //  filter file extensions
        let filteredParamFilesAndFolders = paramFilesAndFolders.filter(file =>
          this.filterFileExtensions(file)
        );

        (this.filteredFilesAndFolders = filteredParamFilesAndFolders.sort(
          (a, b) => {
            // sort label a-z
            if (this.getFilter === "a-z") {
              return a.label.localeCompare(b.label);
            }
          }
        )),
          // sorts folders on top of files
          (this.filteredFilesAndFolders = this.filteredFilesAndFolders.sort(
            (a, b) => {
              return a.isDir === b.isDir ? 0 : a.isDir ? -1 : 1;
            }
          ));

        return this.filteredFilesAndFolders;
      },
      50,
      { trailing: false }
    )
  },
  computed: {
    ...mapGetters(["getFilesAndFolders", "getPreviewFile"])
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
