<template>
  <div class="file-browser-container">
    <FBNavigationBar />

    <!-- show window view folders or list view  -->
    <FBWindowView v-if="getDisplayWindowView"/>
    <FBListView />

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
import FBListView from "./../components/FBListView"

// modals
import FBFullscreenPreviewModal from "../components/modals/FBFullscreenPreviewModal"
import { mapGetters } from 'vuex';

export default {
  components: {
    FBFooterPath,
    FBNavigationBar,
    FBSidebar,
    FBWindowView,
    FBBreadcrumbBar,
    FBFullscreenPreviewModal,
    FBListView,
  
  },
  computed: {
    ...mapGetters(['getDisplayWindowView'])
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
