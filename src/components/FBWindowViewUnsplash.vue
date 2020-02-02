<template>
        
        <div>
            <div class="unsplash">
            <h5>creatorUnsplash</h5>

            <q-input class="unsplash-input" v-model="searchTerm"></q-input>
            <q-btn @click="getPhotos">Get Photos</q-btn>

        </div>


        <div class="unsplash-container row items-start">

            <div
                v-for="searchResult in unsplashSearchResults"
                :class="`${numColsClassName} file-col unsplash`"
                :key="searchResult.id"
                @contextmenu.prevent="$refs.fbUnsplashWindow.open($event, searchResult)"
            >


                <div class="image-preview">

                    <div class="fb-image-preview">

                        <img :src="searchResult.urls.thumb" />

                    </div>

                    <div class="title-bar">
                        <div class="file-name-container selected">
                            <div class="file-name selected-background">
                                ...by {{searchResult.user.first_name}} {{searchResult.user.last_name}}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import Unsplash, { toJson } from "unsplash-js";
// in gitignore
import API_KEYS from "../../configApi";

const unsplash = new Unsplash({
	accessKey: API_KEYS.unsplash.publicKey,
	secret: API_KEYS.unsplash.privateKey
});

export default {
	data() {
		return {
			searchTerm: null,
            unsplashSearchResults: [],
            
		};
    },
    
    props: {

        numColsClassName: String,
    },


	methods: {
		// seem to be sorted by likes
		getPhotos() {

			unsplash.search
				.photos(this.searchTerm, 1, 30, { orientation: "landscape" })
				.then(toJson)
				.then(json => {
					this.unsplashSearchResults = json.results;
					console.log("unsplashResults", json);
				});
		}
	}
};
</script>

<style lang="scss">

.unsplash-container {
    position: relative;

    .unsplash {
        display: block;
        position: relative;
    }

    .title-bar {
		top: 9px;
		position: relative;
		height: 32px;
		z-index: 2;
    }

    .unsplash-input {
        height: 40px;
        background: black;
        border-radius: 4px;
        position: sticky;
        top: 0px;
    }

	.file-name-container {
		max-height: 34px;
		/* height: 25px; */
		opacity: 0.8;
		font-weight: 400;
		font-size: 11px;
		color: #ffffff;
		max-width: 100%;
		word-wrap: break-word;

		.file-name {
			position: relative;
			-webkit-user-select: none;

			&.selected-background {
				opacity: 1;

				background: #6897bb;
				border-radius: 3px;
				padding: 2px 4px;
				display: inline-block;
				word-break: break-word;
			}
		}

		&.selected {
			opacity: 1;
			font-weight: 700;
			-webkit-user-select: none;
        }
        
    }
}

</style>


