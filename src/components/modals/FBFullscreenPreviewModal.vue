<template>
	<modal
		:clickToClose="true"
		name="fullscreen-preview"
		@before-open="beforeOpen"
		@before-close="beforeClose"
		width="100%"
		height="100%"
		:adaptive="false"
		:scrollable="true"
		overlayTransition="false"
	>
		<div class="fb-modal-preview" @click="closePreview($event)">
				<FBWindowViewPreviewBucket  class="modal-preview" :fileOrFolder="getPreviewFile" />
				
		<div
			class="close-modal-btn"
			@click="$modal.hide('fullscreen-preview')" 
			color="primary"
		>
			<i class="fas fa-times fa-2x"></i>

		</div>

		</div>
	</modal>
</template>
 
<script scoped>
import { mapActions, mapGetters } from "vuex";

import FBWindowViewPreviewBucket from "../FBWindowViewPreviewBucket";

import fs from "fs-extra";

export default {
	components: {
		FBWindowViewPreviewBucket
	},
	methods: {
		closePreview(event) {
		// padding is causing a weird aspect ratio

		//   this.$modal.hide("fullscreen-preview");

		},

		beforeOpen() {

		},

		beforeClose() {

		}
	},
	computed: {
		...mapGetters(["getPreviewFile"])
	}
};
</script>

<style lang="scss">
.fb-modal-preview {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 20;
	width: 100%;
	height: 100%;

	.close-modal-btn {
		cursor: pointer;
		color: white;
		opacity: 0.8;
		padding: 10px 15px;
		position: absolute;
		right: 0;
		transition: transform 200ms ease;

		&:hover {
			opacity: 1.0;
			transform: scale(1.2);
		}
	}

	.modal-close-button {
		position: absolute;
		right: 1rem;
		display: block;
		top: 1rem;
		z-index: 20;
		width: 1.5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		font-size: 1.5rem;
		opacity: 1.0;
		color: white;
		cursor: pointer;

		&:hover {
			opacity: 1;
		}
	}

	.center {
		text-align: center;
	}

	.folder-preview {
		left: 50%;
		top: 50%;
		position: absolute;
		transform: translate(-50%, -50%);
	}
}

.v--modal-box {
	&.v--modal {
		background: rgba(0, 0, 0, 0);
	}
}
</style>

