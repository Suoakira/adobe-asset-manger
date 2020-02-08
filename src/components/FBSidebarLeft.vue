<template>
	<div class="sidebar-left-container">
		<q-expansion-item expand-separator v-model="favTabExpanded" label="Folders">

			<q-card>
				<q-card-section>
					<div 
						:class="`drag-drop-area ${dragging ? 'dragging' : ''}`"
						@drop.prevent="dropFolder"
						@dragover.prevent="dragging = true"
						@dragenter.prevent="dragging = true"
						@dragleave.prevent="dragging = false"
					>
						<h5 v-if="dragging" >Drop Folder</h5>
					</div>

						<div v-for="savedFolder in getSavedFolders" :key="savedFolder">
							<SavedFolderCard :savedFolderPath="savedFolder" :niceName="folderNicename(savedFolder)"></SavedFolderCard>
						</div>

				</q-card-section>
			</q-card>
			
		</q-expansion-item>

		<q-expansion-item expand-separator v-model="getFileTreeExpanded" label="File Tree">

			<q-card>
				<q-card-section>

					<div class="fb-list-view-container">

						<FBListView />

					</div>

				</q-card-section>
			</q-card>

		</q-expansion-item>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import fs from "fs-extra"

import FBListView from "./FBListView";
import SavedFolderCard from "./_SavedFolderCard";

export default {
	data: () => ({
		favTabExpanded: true,
		getFileTreeExpanded: true,
		dragging: false,
	}),
	components: {
		FBListView,
		SavedFolderCard
	},
	methods: {
		folderNicename(path) {
			const splitPath = path.split("/");

			return splitPath[splitPath.length - 1];
		},

		dropFolder(evt) {



			if (fs.lstatSync(evt.dataTransfer.files[0].path).isDirectory()) {

			const addedFolder = { isDir: true, nodeKey: "/" + evt.dataTransfer.files[0].path}
			this.dragging = false
			

			this.$store.dispatch("saveAsFavFolder", addedFolder);
			
            this.$q.notify({
                message: `Folder added! <b <span style="color: #80D3F7">${addedFolder.nodeKey.slice(1)}</b>`,
                color: '#80D3F7',
                html: true
			})
			
			} else {
				this.$q.notify({
					message: 'Sorry that is not a directory',
					color: '#80D3F7',
					html: true
			})



			}
		}
	},
	computed: {
		...mapGetters(["getSavedFolders"])
	}
};
</script>

<style lang="scss">
.sidebar-left-container {
	position: fixed;

	width: 200px;
	max-width: 780px;
	top: 40px;
	height: 100%;
	background: #272727;
	box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.2);

	.drag-drop-area {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0px;
		z-index: 1;
		transition: background 200ms ease, border 200ms ease;

		// background: red !important;

			&.dragging {
				background-color: #272727;
				opacity: 0.9;
				border: 5px dashed $color-active-but;
				border-radius: 8px;
			}

			h5 {
				pointer-events: none;
				position: absolute;
				left: 50%;
				top: 22%;
				transform: translateX(-50%);
			}



	}

	.q-item {
		background: #2e2e2e;
	}

	.q-item__label {
		opacity: 0.8;
		font-size: 10px;
		color: #ffffff;
		font-weight: 500;
	}

	.q-item__label--caption {
		opacity: 0.8;
		font-size: 10px;
		color: #ffffff;
		font-weight: 300;
	}

	.q-expansion-item__toggle-icon {
		font-size: 16px !important;
	}

	.q-card__section {
		padding: 4px 0px 4px 0px;
		background: #272727;
	}

	.q-tree__node-header {
		// padding-left: 16px;
	}

	.q-expansion-item__content .relative-position {
		// padding-left: 16px;
	}

	.fb-list-view-container {
		padding-left: 16px;
	}

	.q-pa-md {
		&.q-gutter-sm {
			padding: 0px;
		}
	}
}
</style>