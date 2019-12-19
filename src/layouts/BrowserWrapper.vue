<template>
  <div class="file-browser-container">
    <FBNavigationBar />
    <FBWindowView />
    <FBSidebar />
    <FBBreadcrumbBar />

    <!-- modals  -->
    <FBFullscreenPreviewModal />
  </div>
</template>

<script>

// main component buckets
import FBFooterPath from "./../components/FBFooterPath";
import FBNavigationBar from "./../components/FBNavigationBar";
import FBSidebar from "./../components/FBSidebar";
import FBWindowView from "./../components/FBWindowView";
import FBBreadcrumbBar from  "./../components/FBBreadcrumbBar";

// modals
import FBFullscreenPreviewModal from "../components/modals/FBFullscreenPreviewModal"

export default {
  components: {
    FBFooterPath,
    FBNavigationBar,
    FBSidebar,
    FBWindowView,
    FBBreadcrumbBar,
    FBFullscreenPreviewModal
  }
};
</script>

<style lang="scss">
.file-browser-container {
  position: relative;
  max-width: 1000px;
  
  // disable user select across app
  user-select: none;
}
</style>
