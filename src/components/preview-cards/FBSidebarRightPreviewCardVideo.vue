<template>

	<div class="fb-sb-video-preview">

		<video 
			@click="fullScreenPreview"
			@mouseover="playVideo($event)" 
			@mouseout="stopVideo($event)" 
			:ref="`videoPlayer_${file.label}`" 
			:src="`file://${file.nodeKey}`" 
			type="video/mp4" 
			:controls="controls" 
			loop 
			muted>
		</video>

	</div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {

	props: {
		file: Object,
		// label: String,
		controls: Boolean,

	},

	methods: {

		playVideo(event) {

			event.target.play()
		},
		
		stopVideo(event) {

			event.target.pause()
		},

		fullScreenPreview() {
			if (!this.getPreviewFile.isDir) {
				this.$modal.show("fullscreen-preview");
			}
		}

	},

	computed: {
		...mapGetters(['getPreviewFile'])
	}
};
</script>

<style lang="scss" scoped>

	.fb-sb-video-preview {
		cursor: pointer;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%)
	}

</style>