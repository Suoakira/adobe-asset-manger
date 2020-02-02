<template>
	<div class="file-browser-container">

		<FBNavigationBar />

		<!-- show window view folders or list view  -->
		<FBWindowView />
		<FBSiderbarLeft />


		<FBSidebarRight />
		<FBBreadcrumbBar />

		<!-- modals  -->
		<FBFullscreenPreviewModal />
		
	</div>
</template>

<script>

// main component buckets
import FBNavigationBar from "./../components/FBNavigationBar";
import FBSidebarRight from "./../components/FBSidebarRight";
import FBWindowView from "./../components/FBWindowView";
import FBBreadcrumbBar from  "./../components/FBBreadcrumbBar";
import FBSiderbarLeft from "./../components/FBSidebarLeft"

// modals
import FBFullscreenPreviewModal from "../components/modals/FBFullscreenPreviewModal"
import { mapGetters } from 'vuex';

export default {
	components: {

		FBNavigationBar,
		FBSidebarRight,
		FBWindowView,
		FBBreadcrumbBar,
		FBFullscreenPreviewModal,
		FBSiderbarLeft,
	},

	watch: {

		$route(to, from) {

		}

	},

};
</script>

<style lang="scss">
.file-browser-container {
	position: relative;
	max-width: 1265px;
	width: 100vw;
	height: 100vh;
	background: $color-body-bg;
	
	// disable user select across app
	user-select: none;
}
</style>
