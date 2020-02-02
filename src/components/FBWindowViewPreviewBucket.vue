<template>
	<div>
		<div class="preview-container">
			<div :class="`image-preview ${selectedFilePath === fileOrFolder.nodeKey && 'selected' }`">


			<FBPreviewCardImage
				:file="fileOrFolder"
				v-if="fileOrFolder.mimeType && !isMimetype(fileOrFolder, 'video') || fileOrFolder.isDir "
			/>

			<FBPreviewCardVideo
				:file="fileOrFolder"
				v-if="fileOrFolder.mimeType && isMimetype(fileOrFolder, 'video')"
			/>

			<div class="title-bar">
				<div :class="`file-name-container ${selectedFilePath === fileOrFolder.nodeKey && 'selected' }`">
					<div :class="`file-name ${selectedFilePath === fileOrFolder.nodeKey && 'selected-background' }`">{{truncate(fileOrFolder.label, 20, "...", fileOrFolder)}}</div>
				</div>
			</div>
			</div>
		</div>
	</div>	
</template>

<script>
// mixins
import fileFilters from "../mixins/file-filters.js";
import utils from "../mixins/utils"

// previews cards
import FBPreviewCardImage from "./preview-cards/FBPreviewCardImage";
import FBPreviewCardVideo from "./preview-cards/FBPreviewCardVideo";

export default {
	data() {
		return {


		};
	},
	props: {
		fileOrFolder: Object,
		selectedFilePath: String
	},
	mixins: [fileFilters, utils],
	components: {
		FBPreviewCardImage,
		FBPreviewCardVideo
	},
};
</script>

<style lang="scss">

.preview-container {



	
	.image-preview {
	
	position: absolute;

	width: 100%;
	height: auto;


	max-height: 100%;
	max-width: 100%;

	border: 9px solid transparent;



		// &:hover {
			
		//   border: 9px solid lighten(red, 15%);
		//   // background: lighten(black, 15%);
		// }

		// &.selected {
		//   border: 9px solid lighten(red, 15%);

			// border: 9px solid #282828;
			// border: 9px solid lighten(black, 15%);
			// background: lighten(black, 15%);


		// }


	// background: yellow;
	// border: green 2px solid;
	.file-title {
		text-align: center;
		margin: 0 auto;
		font-size: 12px !important;
		font-weight: 600;
	}

	.file-item {
		width: 65px;
		height: 65px;
		-webkit-user-select: none;
	}

	.title-bar {
		top: 9px;
		position: relative;
		height: 32px;
		z-index: 2;
	}

	.file-name-container {
		max-height: 34px;
		/* height: 25px; */
		opacity: 0.8;
		font-weight: 400;
		font-size: 11px;
		color: #ffffff;
		max-width: 100%;
		word-wrap: break-word;

		.file-name {
			position: relative;
			-webkit-user-select: none;

			&.selected-background {
				opacity: 1;

				background: #6897bb;
				border-radius: 3px;
				padding: 2px 4px;
				display: inline-block;
				word-break: break-word;
			}
		}

		&.selected {
			opacity: 1;
			font-weight: 700;
			-webkit-user-select: none;
		}
	}
}

}
</style>
