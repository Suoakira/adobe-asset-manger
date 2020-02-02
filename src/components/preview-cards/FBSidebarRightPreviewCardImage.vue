<template>

	<div class="fb-sb-image-preview">

		<img 
			@click="fullScreenPreview"
			:class="`${file.isDir && 'folder'}`"
			:src="getAssetPaths(file)" 
		/>

	</div>

</template>

<script>
import fileFiltersMix from "../../mixins/file-filters" 
import path from "path"
import { mapGetters } from 'vuex';

export default {

	mixins: [fileFiltersMix],

	props: {
		file: Object,
		path: String
	},

	methods: {

		fullScreenPreview() {
			if (!this.getPreviewFile.isDir) {
				this.$modal.show("fullscreen-preview");
			}
		}

	},

	computed: {
		...mapGetters(['getPreviewFile'])
	},
	
	created() {
		console.log("image createdhook", this.file)
	}
};
</script>

<style lang="scss">


</style>