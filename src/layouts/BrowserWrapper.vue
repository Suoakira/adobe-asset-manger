<template>
  <div class="file-browser-container">
    <FBNavigationBar />
    <FBWindowView />
    <FBSidebar />
    <FBBreadcrumbBar />
  </div>
</template>

<script>
import FBFooterPath from "./../components/FBFooterPath";
import FBNavigationBar from "./../components/FBNavigationBar";
import FBSidebar from "./../components/FBSidebar";
import FBWindowView from "./../components/FBWindowView";
import FBBreadcrumbBar from  "./../components/FBBreadcrumbBar";

export default {
  components: {
    FBFooterPath,
    FBNavigationBar,
    FBSidebar,
    FBWindowView,
    FBBreadcrumbBar
  }
};
</script>

<style lang="scss">
.file-browser-container {
  position: relative;

  max-width: 1000px;
}
</style>
