<template>
  <div :class="`saved-folder ${handleMouseoverFilePath === getBrowserPath && 'active'} `"
    @mouseover="handleMouseoverFilePath = getBrowserPath"
    @mouseout="handleMouseoverFilePath = null"
    @click="navigate(savedFolderPath)"

  >
   
    <div      
      :class="`${getBrowserPath === savedFolderPath  ? 'active' : ''}  `"
      >
      <span class="icon-wrapper"><i :class="`fb-folder-icon folder fas ${iconToShow(savedFolderPath)}`"></i></span>
      <span :class="`header-title ${savedFolderPath === getBrowserPath && 'active'}`" > {{ niceName }}</span>

    </div>


          <i class="fas fa-times fb-folder-icon-remove"
    v-show="handleMouseoverFilePath === getBrowserPath"
    @click="removeFavFolder(savedFolderPath)"></i>


  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import path from "path";
import fs from "fs-extra";


export default {
  data: () => ({
    handleMouseoverFilePath: null,
  }),
  props: {
    niceName: String,
    icon: String,
    savedFolderPath: String
  },
  methods: {
    ...mapActions(['removeFavFolder']),
    // create a switch statement that will return different icons based on what path we are in

    
    iconToShow(paramPath) {
      const ajustedParamPath = paramPath.slice(1)

      const desktopPath = path.join(require("os").homedir(), "Desktop");
      const downloadsPath = path.join(require("os").homedir(), "Downloads");
      const documentsPath = path.join(require("os").homedir(), "Documents");

      if (ajustedParamPath.includes("Volumes")) {
        return "fa-hdd";
      } else if (desktopPath === ajustedParamPath) {
        return "fa-desktop";
      } else if (downloadsPath === ajustedParamPath) {
        return "fa-file-download";
      } else {
        return "fa-folder";
      }
        return "fa-folder";
    
    },

    navigate(paramPath) {

      this.$store.dispatch("setBrowserPath", paramPath);
      if (fs.existsSync(paramPath)) {
        this.$store.dispatch("retrieveFolderContents", paramPath);
      }
    },
  },
  computed: {
    ...mapGetters(['getBrowserPath'])
  }
};
</script>

<style lang="scss">

.saved-folder {
  // display: inline-block;
  position: relative;
  height: 24px;
  width: 100%;
  background-color: #272727;
  cursor: pointer;
  transition: background 300ms ease;

  &.active {
    background-color: lighten(#272727,4%);
  }  

  .active {
    background-color: lighten(#272727,4%);
  }

  .header-title {
    opacity: 0.4;
    font-size: 11px;
    color: #ffffff;
    font-weight: 400;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &.active {
      opacity: 0.6;
    }
    // margin-left: 32px;
  }

  .icon-wrapper {
    position: relative;
    width: 25px;
    height: 24px;;
    display: inline-block;
  }

  .fb-folder-icon {
    color: white;
    opacity: 0.4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 14px;

  }


    .fb-folder-icon-remove {
      color: white;
      opacity: 0.6;
      position: absolute;
      top: 50%;
      right: 3%;
      opacity: 0.2;
      transform: translateX(-50%) translateY(-50%);
      font-size: 12px;
      transition: opacity 350ms ease;

    }
}
</style>
