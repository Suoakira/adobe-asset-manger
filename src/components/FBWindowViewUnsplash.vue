<template>
        
    <popover class="unsplash-popover" :width="635" name="unsplash">
        <div class="unsplash-container">
            <div class="unsplash-menu"> 
                
                <h5>Unsplash   
                </h5>

                <q-badge class="unsplash-badge">
                    NEW!<q-icon color="white" />
                </q-badge>

                <div class="inline-form">
                    <q-input
                        ref="unsplash-input"
                        :borderless="true" 
                        input-class="unsplash-input" 
                        v-model="searchTerm"></q-input>
                </div>

                <div class="inline-form">
                    <q-btn 
                        class="unsplash-btn"
                        @click="getPhotos">search
                    </q-btn>
                </div>


				

            </div>

            

            <VueContext ref="fbUnsplashWindow" class="context-menu" :closeOnScroll="true">

                <template slot-scope="child">

                    <div v-if="child.data !== null">

					    <li class="context-header">Save to Folder</li>

                        <li v-for="folder in getSavedFolders" :key="folder"> 

                            <p @click="test(child.data, folder)">

                              {{ folderNicename(folder)}}

                            </p>
                        </li>

                    </div>
                    
                    <!-- <li @click.prevent="">{{child.data}}</li> -->
                </template>

            </VueContext>


            <div class="unsplash-grid row items-start">

                <div
                    v-for="searchResult in unsplashSearchResults"
                    class=" col-3 file-col unsplash"
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


                <div class="unsplash-search-empty" :if="unsplashSearchResults.length">

                    <h5> search beautiful royality free images...</h5>
                        <i class="fas fa-camera fa-3x"></i>
                </div>
            </div>

        </div>
    </popover>
</template>

<script>
import Unsplash, { toJson } from "unsplash-js";
import { VueContext } from "vue-context";
import { Notify } from 'quasar'
import axios from "axios";
import fs from "fs-extra";
import download from "image-downloader"
var https = require('https');


// in gitignore
import API_KEYS from "../../configApi";
import { mapGetters } from 'vuex';

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

    components: {
        VueContext
    },

    watch: {
        unsplashSearchResults() {
            console.log("unsplashSearchResults", this.unsplashSearchResults)
        }
    },


	methods: {

        test(unsplashObj, folder) {

            console.log(unsplashObj)
            // const unsplashDownload = unsplashObj.urls.full
            // console.log(folder.slice(1))
            // this.downloadImage(unsplashDownload, folder.slice(1))
            // console.log("folder", folder)

            this.$q.notify({
                message: `<b>${unsplashObj.alt_description}</b> image! added to <b <span style="color: #80D3F7">${folder.slice(2)} </b>`,
                color: '#80D3F7',
                html: true
            })
            
        },

		// seem to be sorted by likes
		getPhotos() {

			unsplash.search
				.photos(this.searchTerm, 1, 30, { orientation: "landscape" })
				.then(toJson)
				.then(json => {
					this.unsplashSearchResults = json.results;
					console.log("unsplashResults", json);
				});
        },

		folderNicename(path) {
			const splitPath = path.split("/");

			return splitPath[splitPath.length - 1];
        },
        
        downloadImage(url, image_path) {


//Node.js Function to save image from External URL.
        var fullUrl = url;
        var file = fs.createWriteStream(image_path);
        var request = https.get(url, function(response) {
        response.pipe(file);
        });
        }

    },

    computed: {
        ...mapGetters(['getSavedFolders'])
    },


};
</script>

<style lang="scss">

.q-badge {
    background: $card-border-selected;

}

.vue-popover[style] {
    width: 540px !important;
    left: 704px !important;
    top: 40px !important;
    height: 376px;
    background: #2e2e2e;
    position: fixed;
    box-shadow: none !important;

    &:before {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #2e2e2e !important;

        position: relative;
        top: -11px !important;
        left: 476px !important;

    }
}

.unsplash-container {
    margin: 5px;
    position: relative;


    .unsplash-badge {

        position: absolute;
        top: 4px;
        left: 61px;
    }


        .unsplash-menu {

            right: 0px;
            position: sticky;
            top: 0px;
            margin: 0px 5px 5px 5px;

            h5 {
                margin: 0;
            }

            z-index: 3;
            background: #2e2e2e;

            .inline-form{
                display:inline-block;
            }
        }

    .unsplash {
        display: block;
        position: relative;
    }

    .unsplash-grid {

        position: relative;
        top: 0px;
        height: 257px;
        max-height: 257px;
        overflow: scroll;
    }

    .title-bar {
        top: 9px;
		position: relative;
		height: 32px;
		z-index: 2;
    }

    .unsplash-input {
        display: inline-block;
        position:relative;

        top: 2px;

        background: black;
        border-radius: 4px;
        height: 40px;

        width: 420.5px;


    }

    .unsplash-search-empty {
        text-align: center;
        h5 {
            margin: 0;
            text-align: center;
        }

        i {
            color: $color-active-but;
        }
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 79px;



    }

    .unsplash-btn {
        position: relative;
        display: inline-block;
        color: white;
        background: $card-border-selected;
    }

	.file-name-container {
		max-height: 34px;
		/* height: 25px; */
		opacity: 1;
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

				background: $color-active-but;
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


