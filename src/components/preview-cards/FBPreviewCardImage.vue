<template>
	<div class="fb-image-preview">

			<img
				:class="`${file.isDir && 'folder'}`" 
				:src="getAssetPaths(file)" 
				/>

	</div>
</template>

<script>
import fileFiltersMix from "../../mixins/file-filters" 
import path from "path"


export default {
	mixins: [fileFiltersMix],
	props: {
		file: Object,
		path: String
	},
	

	created() {
			console.log("image createdhook", this.file)
	}
};
</script>

<style lang="scss">


</style>