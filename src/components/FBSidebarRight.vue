<template>
	<div class="fb-sidebar-right">
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
.fb-sidebar-right {
	position: fixed;
	left: 980px;
	width: 100%;

	top: 40px;
	background: #272727;
	box-shadow: 0 30px 8px 0 rgba(0, 0, 0, 0.2);

	width: 265px;
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
}
</style>
