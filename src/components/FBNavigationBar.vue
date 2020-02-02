<template>
	<div class="navigation-bar">
		<div class="header-title">
			<h2>AE-Explorer</h2>
		</div>

		<div class="history-nav">
			<div class="history-btns">
				<i
					@click="backPath"
					@mouseover="hoveredBtn = 'navback'"
					@mouseout="hoveredBtn = null"
					:class="`fas fa-arrow-left ${hoveredBtn === 'navback' && 'active'}`"
				></i>
				<i
					@click="forwardPath"
					@mouseover="hoveredBtn = 'navforward'"
					@mouseout="hoveredBtn = null"
					:class="`fas fa-arrow-right ${hoveredBtn === 'navforward' && 'active'}`"
				></i>
			</div>

			<div
				@click="stepBackPath"
				@mouseover="hoveredBtn = 'stepback'"
				@mouseout="hoveredBtn = null"
				class="stepback-btn"
			>
				<i :class="`fas fa-level-up-alt ${hoveredBtn === 'stepback' && 'active'}`"></i>
			</div>

			<div
				@click="refreshPath"
				@mouseover="hoveredBtn = 'refresh'"
				@mouseout="hoveredBtn = null"
				:class="`refresh-btn ${hoveredBtn === 'refresh' && 'active'}`"
			>
				<i :class="`fas fa-redo-alt ${hoveredBtn === 'refresh' && 'active'}`"></i>
			</div>

			<div class="right-nav-icons">

				<i class="fas fa-search"></i>
				<i  
					@click="toggleRightSidebarExpanded"
					:class="`fas fa-bars fa-lg ${!getRightSidebarExpanded ? 'active' : ''}`">
				</i>
				
				<i 
					v-popover:unsplash
					@click="toggleShowUnsplashWindow"
					:class="`fas fa-camera ${!getShowUnsplashWindow ? 'active' : ''}`"
				>
				</i>
			</div>


		</div>

		<q-input
			:borderless="true"
			class="navigation-input"
			:value="getBrowserPath"
			@input="value => handleNavInput(value)"
		/>

		<q-input :borderless="true" class="browser-search" v-model="browserSearch"></q-input>

		<hr :class="`loader-temp ${showLoader && 'active'}`" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import fs from "fs-extra";

export default {
	data: () => ({
		browserPath: null,
		toggleSearch: null,
		hoveredBtn: null,
		showLoader: null
	}),
	methods: {
		...mapActions(["toggleRightSidebarExpanded", "toggleShowUnsplashWindow"]),

		handleNavInput(path) {
			this.$store.dispatch("setBrowserPath", path);

			if (fs.existsSync(path)) {
				this.$store.dispatch("retrieveFolderContents", path);
			}
		},

		refreshPath() {
			this.handleNavInput(this.getBrowserPath);

			this.dummyLoader();
		},

		//
		setHistoryPath() {
			let historyPath = this.getBrowserHistory[
				this.getBrowserHistory.length - this.getHistoryCounter
			];

			// if this is pressed dont add to history
			this.$store.dispatch("setBrowserPath", historyPath);

			if (fs.existsSync(historyPath)) {
				this.$store.dispatch(
					"retrieveFolderContents",
					`${historyPath}__HISTORY__`
				);
			}
		},

		backPath() {
			this.$store.dispatch("incrementHistoryCounter");
			this.setHistoryPath();
		},

		dummyLoader() {
			(this.showLoader = true),
				setTimeout(() => {
					this.showLoader = false;
				}, 500);
		},

		forwardPath() {
			this.$store.dispatch("decrementHistoryCounter");
			this.setHistoryPath();
		},

		stepBackPath() {
			let splitPath = this.getBrowserPath.split("/");

			// check if we are at the root path
			if (splitPath[1] !== undefined) {
				splitPath.pop();

				// set root path
				if (splitPath.length === 1 && splitPath[0] === "") {
					this.$store.dispatch("navigatePath", "/");
				} else {
					// set steped back path
					this.$store.dispatch("navigatePath", splitPath.join("/"));
				}
			} else {
				this.$store.dispatch("navigatePath", "/");
			}
		}
	},

	computed: {
		...mapGetters([

			"getBrowserPath",
			"getHistoryCounter",
			"getBrowserHistory",
			"getBrowserSearchTerm",
			"getShowUnsplashWindow",
			"getRightSidebarExpanded"

		]),
		browserSearch: {
			get() {
				return this.getBrowserSearchTerm;
			},
			set(val) {
				this.$store.dispatch("setBrowserSearchTerm", val.toLowerCase());
			}
		}
	},
	watch: {
		browserSearch() {
			console.log("__ browser search term", this.getBrowserSearchTerm);
		},

		getBrowserPath() {
			this.dummyLoader();
		}
	},
	created() {
		this.handleNavInput(this.getBrowserPath);
	}
};
</script>

<style lang="scss" scoped>
.navigation-bar {
	position: fixed;

	top: 0;
	width: 100%;
	z-index: 4;
	max-width: 1244px;
	background: #272727;

	height: 40px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

	.header-title {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: white;

		height: 40px;
		width: 200px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		border-radius: 4px;

		h2 {
			position: relative;
			top: -10px;
			left: 21px;
			opacity: 0.8;
		}
	}

	.navigation-input {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 500px;
		height: 30px;
		background: black;
		border-radius: 4px;

		margin-left: 350px;
		color: white;
	}

	.history-nav {
		display: inline-block;
		position: absolute;
		top: 55%;
		transform: translateY(-55%);

		.history-btns {
			cursor: pointer;
			position: relative;
			display: inline-block;
			left: 219px;
			// background: pink;
			padding: 2px 10px;
			border-radius: 4px;
		}

		.stepback-btn {
			cursor: pointer;

			top: -2px;
			left: 264px;
			position: relative;
			display: inline-block;
			// background: pink;
			padding: 4px 3px;
			border-radius: 4px;
		}

		.refresh-btn {
			cursor: pointer;

			left: 770px;
			position: relative;
			display: inline-block;

			padding: 2px 3px;
			border-radius: 4px;
		}

		.right-nav-icons {
			top: -1px;
			position: relative;
			display: inline-block;
			padding: 2px 3px;
			border-radius: 4px;

			.fa-search {
				position: relative;
				left: 1040px;
			}

			.fa-bars {
				cursor: pointer;
				position: relative;
				left: 1078px;
				
				&:hover {
					opacity: 0.8;
				}

				&.active {
					color: $color-active-but;
					opacity: 1;
					transform: scale(1.3)
				}
			}

			.fa-camera {
				cursor: pointer;
				position: relative;
				left: 1018px;
				transition: transform 300ms ease;
				
				&:hover {
					opacity: 0.8;
				}

				&.active {
					color: $color-active-but;
					opacity: 1;
					transform: scale(1.3)
				}
			}	
			
		}
	}

	.browser-search {
		position: absolute;
		top: 50%;
		right: 99px;
		transform: translateY(-50%);
		width: 160px;
		height: 30px;
		background: black;
		border-radius: 4px;
	}

	// font awesome hooks
	.fas {
		color: white;
		opacity: 0.6;
		margin: 0px 4px;

		&.active {
			opacity: 0.8;
		}
	}

	.loader-temp {
		position: absolute;
		bottom: -9px;
		width: 0px;
		left: 200px;

		opacity: 0.8;
		border: 0px;
		transition: width 500ms ease;

		&.active {
			border-bottom: 3px solid white;
			width: 778px;
		}
	}
}
</style>
