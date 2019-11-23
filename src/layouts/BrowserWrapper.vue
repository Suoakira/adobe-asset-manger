<template>
  <div class="file-browser-container">
    <FBNavigationBar />
    <FBWindowView />
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
