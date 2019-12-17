<template>
  <div class="breadcrumb-bar">
    <span v-for="crumb in breadcrumbPath" :key="crumb.constructedPath">
      <span>/</span>
      <span @click="navigate(crumb.constructedPath)">{{ crumb.path }}</span>
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fs from "fs-extra";
export default {
  methods: {
    navigate(crumbPath) {
        console.log("__crumb path")
      this.$store.dispatch("navigatePath", crumbPath);
    }
  },
  computed: {
    ...mapGetters(["getBrowserPath"]),
    breadcrumbPath() {
      const pathBuilder = this.getBrowserPath.split("/");
      let constructedPath = "";
      let breadCrumbs = [
        {
          path: "root",
          constructedPath: "/"
        }
      ];

      pathBuilder.forEach(path => {

        if (path !== "") {
          constructedPath += "/" + path;
        // console.log("constructedPath", fs.stat(constructedPath))
    
        fs.statSync(constructedPath).isDirectory() &&
            // console.log("_____________", constructedPath.slice(1))
          breadCrumbs.push({
            path: path,
            constructedPath: constructedPath
          });

        }
      });

      return breadCrumbs;
    }
  }
};
</script>

<style lang="scss">
.breadcrumb-bar {
  background: red;
  position: fixed;
  width: 780px;
  height: 25px;
  bottom: 0;
  z-index: 4;
}
</style>