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


        constructedPath += "/" + path;
            console.log(constructedPath)
        if (fs.stats(constructedPath.slice(1)).isDirectory()) 
        path !== "" &&
          breadCrumbs.push({
            path: path,
            constructedPath: constructedPath.slice(1)
          });
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