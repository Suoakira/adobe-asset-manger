<template>
  <div class="file-browser-container">
    <FBNavigationBar />
    <FBWindowView />
    <FBSidebar />
  </div>
</template>

<script>
import FBFooterPath from "./../components/FBFooterPath";
import FBNavigationBar from "./../components/FBNavigationBar";
import FBSidebar from "./../components/FBSidebar";
import FBWindowView from "./../components/FBWindowView";

export default {
  data() {
    return {};
  },
  components: {
    FBFooterPath,
    FBNavigationBar,
    FBSidebar,
    FBWindowView
  }
};
</script>

<style lang="scss">
.file-browser-container {
  position: relative;

  max-width: 1000px;
}
</style>
