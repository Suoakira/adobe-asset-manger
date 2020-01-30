<template>
	<div class="breadcrumb-bar">
		
		<i class="fas fa-folder open-folder"></i>

		<div class="center current-route">

			<div class="path-scroll-wrapper" ref="path-scroll">

				<span class="path-txt" v-for="crumb in breadcrumbPath" :key="crumb.constructedPath">

					<span class="crumb-text-no-hover"><i class="fas fa-angle-double-right"></i></span>
					<span class="crumb-text" @click="navigate(crumb.constructedPath)">{{ crumb.path }}</span>

				</span>
			</div>

		</div>
		
		<div class="num-cols-slider">
			<FBGridSlider />
		</div>

	</div>
</template>

<script>
import { mapGetters } from "vuex";
import fs from "fs-extra";

import FBGridSlider from "./FBGridSlider"

export default {
	components: {
		FBGridSlider
	},
	methods: {
		navigate(crumbPath) {

			this.$store.dispatch("navigatePath", crumbPath);
		}
	},
	computed: {
		...mapGetters(["getBrowserPath"]),
		breadcrumbPath() {

			const pathBuilder = this.getBrowserPath.split("/");
			let constructedPath = "";
			let breadCrumbs = [
				{
					path: "Macintosh HD",
					constructedPath: "/"
				}
			];

			pathBuilder.forEach(path => {
				if (path !== "") {
					constructedPath += "/" + path;

					fs.statSync(constructedPath).isDirectory() &&
						breadCrumbs.push({
							path: path,
							constructedPath: constructedPath
						});
				}
			});

			return breadCrumbs;
		}
	}
};
</script>

<style lang="scss">
.breadcrumb-bar {
	background: #232323;
	position: absolute;
	right: 0;
	left: 200px;
	height: 25px;
	bottom: 0;
	z-index: 4;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

	.num-cols-slider {
		position: absolute;
		top: -11px;
		right: 250px;
		width: 100px;
	}

	.hide-browse-path-input {
		display: none;
	}

	&.sb-expanded {
		width: 740px;
	}

	.center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.open-folder {

		z-index: 2;
		margin-left: 10px;
		opacity: 0.6;
		color: white;
		cursor: pointer;
		transition: opacity 100ms ease;
		top: -2px;
		position: relative;

		&:hover {
			opacity: 0.8;
		}
	}

	.browser-input {
		position: absolute;
		left: 0;
		height: 100%;
		border-radius: 0;
		padding: 0px;
		color: lighten(black, 50%);
		text-indent: 30px;
		border: none;
		background: lighten(black, 0%);
		font-weight: 600;
		letter-spacing: 0.1px;
		font-size: 11px;
		line-height: 1;
		padding-bottom: 3px;
		z-index: 1;

		&:focus {
			outline: none;
			box-shadow: none;
		}

		&.sb-expanded {
			width: 515px;
		}
	}

	.current-route {
		height: 16px;
		margin-left: 35px;
		height: 17px;
		width: 405px;
		white-space: nowrap;
		overflow: hidden;
		cursor: pointer;

		&.sb-expanded {
			width: 515px;
		}

		.path-scroll-wrapper {
			width: 100%;
			overflow-x: scroll;
			overflow-y: hidden;
			height: 100%;
			cursor: default;

			&:hover {
				.edit-pencil-icon {
					opacity: 0.8;
				}
			}

			.path-txt {
				// top: 50%;
				// transform: translateY(-55%);
				opacity: 1;
				font-weight: 400;
				font-size: 11px;
				color: #5f5f5f;
				line-height: 15px;
				width: 100%;
				user-select: none;

				&:first-child {
					.crumb-text-no-hover {
						display: none;
					}
				}

				.crumb-text {
					cursor: pointer;
					position: relative;
					color: #ffffff;
					opacity: 0.6;
					top: -7px;
					transition: opacity 0.1s ease;
					transform: translateY(-55%);

					&:hover {
						opacity: 0.8;
						text-decoration: none;
					}
				}

				.crumb-text-no-hover {
					margin: 0 0.4rem;
					position: relative;
					top: -35%;
					transform: translateY(-55%);
					opacity: 0.8;
					cursor: default;

					i {
						font-size: 0.6rem;
					}
				}
			}

			.edit-pencil-icon {
				width: 11px;
				cursor: pointer;
				position: relative;
				opacity: 0;
				top: -6px;
				left: 8px;
				transition: opacity 100ms ease;
				&:hover {
					opacity: 0.8;
				}
			}
		}
	}

	.lazy-loading {
		width: 120px;
		height: 16px;
		right: 16px;
		margin-right: 25px;

		.lazy-txt {
			position: absolute;
			opacity: 0.6;
			font-weight: 400;
			font-size: 11px;
			color: #ffffff;
			line-height: 15px;
		}
	}

	.grid {
		cursor: pointer;
		position: absolute;
		right: 0;
		color: #4f4f4f;
		margin-right: 11.6px;
	}

	.custom-bs-popover {
		width: 500px;
	}
}
</style>