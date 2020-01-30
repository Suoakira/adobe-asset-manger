<template>
	<div class="fb-sidebar">
		<q-expansion-item expand-separator v-model="previewExpanded" label="Info & Preview">
			<q-card>
				<q-card-section>
					<FBSidebarPreview />
				</q-card-section>
			</q-card>
		</q-expansion-item>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import fs from "fs-extra";

import FBSidebarPreview from "./FBSidebarPreview";

export default {
	data() {
		return {
			text: "test",
			favTabExpanded: true,
			previewExpanded: true
		};
	},

	components: { FBSidebarPreview },

	methods: {

	},
	computed: {
		...mapGetters(["getSavedFolders", "getBrowserPath"])
	},

	created() {
		this.$root.$on("expandPreview", value => {
			this.previewExpanded = value;
		});
	},
	beforeDestroy() {
		this.$root.$off("expandPreview");
	}
};
</script>

<style lang="scss" >
.fb-sidebar {
	position: fixed;
	left: 980px;

	top: 40px;
	background: #272727;
	box-shadow: 0 30px 8px 0 rgba(0, 0, 0, 0.2);

	width: 220px;
	height: 100%;

	.q-item__label {
		opacity: 0.6;
		font-size: 10px;
		color: #ffffff;
		font-weight: 500;
	}

	.q-item {
		background: #2e2e2e;
	}

	.q-item__label--caption {
		opacity: 0.6;
		font-size: 10px;
		color: #ffffff;
		font-weight: 300;
	}

	.q-expansion-item__toggle-icon {
		font-size: 16px !important;
	}

	.q-card__section {
		padding: 0;
		background: #272727;
	}

	//   .accordion-fav-folder {
	//     padding: 0;
	//   }

	//   .accordion-file-preview {
	//     padding: 0;
	//   }
	//   .fav-folders-accordion {
	//     .p-1 {
	//       background: $background-sb-file-browser;
	//     }
	//     .tab-btn {
	//       cursor: pointer;
	//       position: relative;
	//       background: $background-sb-file-browser;
	//       border: none;
	//       box-shadow: none;
	//       height: 30px;
	//       &.extra-pad {
	//         margin-top: 20px;
	//       }
	//     }
	//     .tab-header {
	//       opacity: 0.35;
	//       font-weight: 700;
	//       font-size: 10px;
	//       color: #ffffff;
	//       text-decoration: none;
	//       margin-left: 8px;
	//     }
	//     .expand-icon {
	//       opacity: 0.35;

	//       color: white !important;
	//       position: absolute;
	//       top: 50%;
	//       /* left: 0; */
	//       transform: translateY(-50%);
	//       right: 2%;
	//     }

	//     .preview-tab {
	//       position: fixed;
	//       width: 220px;
	//       /* width: 100%; */
	//       z-index: 2;
	//     }

	//     .file-preview-container {
	//       top: 38px;
	//       position: relative;
	//       height: 450px;
	//       max-height: 460px;
	//       overflow: scroll;
	//     }
	//   }

	//   // overide:bootstrap
	//   .card {
	//     border: none;
	//     border-radius: 0;
	//     background: #272727;
	//     margin-bottom: 0 !important;
	//   }

	//   .card-header {
	//     /* padding: 0.75rem 1.25rem; */
	//     margin-bottom: 0;
	//     background-color: rgba(0, 0, 0, 0.03);
	//     border: none !important;
	//     border-radius: none !important;
	//   }
}
</style>
