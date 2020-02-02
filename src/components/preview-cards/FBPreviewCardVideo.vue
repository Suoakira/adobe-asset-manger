<template>
	<div class="fb-video-preview">

			<video @mouseover="playVideo($event)" @mouseout="stopVideo($event)" :ref="`videoPlayer_${file.label}`" :src="`file://${file.nodeKey}`" type="video/mp4" :controls="controls" loop muted></video>

	</div>
</template>

<script>
export default {
	props: {
		file: Object,
		// label: String,
		controls: Boolean,
		// isModalPreview: Boolean

	},
	methods: {
		playVideo(event) {

			event.target.play()
		},
		
		stopVideo(event) {

			event.target.pause()
		}
	}
};
</script>

<style lang="scss">
</style>