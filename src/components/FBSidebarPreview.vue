<template>
	<div class="sb-container" v-if="getPreviewFile !== null">
		<div class="sb-preview">
			<FBSidebarViewPreviewBucket 
				:fileOrFolder="getPreviewFile" 
			/>
		</div>


		<div class="file-stats">

			<!-- name  -->
			<FBSidebarPreviewStatsCard label="Name" :data="getPreviewFile.label" />

			<!-- type  -->
			<FBSidebarPreviewStatsCard
				v-if="!getPreviewFile.isDir"
				label="Type"
				:data="
				`${isAepFile(getPreviewFile) ? 'After Effects file':
				isPsdFile(getPreviewFile) ? 'Photoshop file':
				isIllustratorFile(getPreviewFile) ? 'Illustrator file' :
				getPreviewFile.extension.slice(1).toUpperCase()} `
			"
			/>

			<!-- image  -->
			<FBSidebarPreviewStatsCard
				v-if="!getPreviewFile.isDir && !isPsdFile(getPreviewFile) && getPreviewFile.mimeType.includes('image')"
				label="Res"
				:data="dimensions(getPreviewFile.nodeKey)"
			/>

			<!-- size  -->
			<FBSidebarPreviewStatsCard
				label="Size"
				:data="`${convertBytesToMegaBytes(getPreviewFile.stat.size)}mb`"
			/>

			<!-- created  -->
			<FBSidebarPreviewStatsCard label="Created at" data="placeholder" />

			<!-- last updated  -->
			<FBSidebarPreviewStatsCard label="Updated at" data="placeholder" />

			<!-- path  -->
			<FBSidebarPreviewStatsCard label="Path" :data="getPreviewFile.nodeKey" />

		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

// mixins
import fileFilters from "../mixins/file-filters.js";
import utils from "../mixins/utils.js";

// import preview bucket
import FBSidebarViewPreviewBucket from "./FBSidebarViewPreviewBucket";

// stat card
import FBSidebarPreviewStatsCard from "./FBSidebarPreviewStatsCard";

export default {
	mixins: [fileFilters, utils],

	computed: {
		...mapGetters(["getPreviewFile", "getSavedFolders"]),
		folderIsSaved() {
			return this.getSavedFolders.includes(this.getPreviewFile.nodeKey);
		}
	},

	components: {
		FBSidebarPreviewStatsCard,
		FBSidebarViewPreviewBucket
	},
};
</script>

<style lang="scss">


.sb-container {
	position: relative;
	width: 100%;

	.sb-preview {
		height: 222px;

		width: 100%;
		position: relative;
		padding: 10px;

	}

	.file-stats {
		width: 80%;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
   text-overflow: ellipsis;
	}

}
</style>