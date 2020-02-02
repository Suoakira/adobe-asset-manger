<template>

	<div class="meta-data-card">

		<span class="file-title">{{label}}:</span>
		<span class="file-data">{{ data }}</span>

	</div>

</template>

<script>
import { mapGetters } from 'vuex';
export default {
	props: {
			label: String,
			data: String,
	},
};
</script>


<style lang="scss" scoped>
.meta-data-card {
	position: relative;
	margin: 2px 0px;
	&:after {
	 content: " ";
	 display: block; 
	 height: 0; 
	 clear: both;
	}  
}

.file-title {
	width: 30%;
	opacity: 0.6;
	font-weight: 900;
	font-size: 11px;
	color: white;
	float: left !important;
	text-align: right;
	padding-right: 4px;
}

.file-data {
	width: 70%;
	float: right;
	opacity: 0.8;
	font-weight: 500;
	font-size: 11px;
	color: white;
	text-align: left;
	padding-left: 4px;
	text-overflow: ellipsis;


}
</style>