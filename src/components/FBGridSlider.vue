<template>

    <div 
        @mouseover="hoverState = true"
        @mouseleave="hoverState = null"
        class="grid-slider">

        <q-slider 
            v-model="numCols" 
            :step="1" 
            :min="0" 
            :max="5"
            :label="true"
            :label-value="sliderLabel"
            snap
        />

        <i :class="`fas fa-th ${hoverState ? 'active' : ''}`"></i>



    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    data: () => ({

        sliderLabel: null,
        hoverState: null,

    }),

    methods: {
        gridSliderLabel() {

            if (this.getNumCols === 5) {

                this.sliderLabel = 'Super-Oversize'
			} else if (this.getNumCols === 4) {
                
                this.sliderLabel = 'Oversize'
			} else if (this.getNumCols === 3) {
                
                this.sliderLabel = 'Large'
			} else if (this.getNumCols === 2) {
                
                this.sliderLabel = 'Medium'
			} else if (this.getNumCols === 1) {
                
                this.sliderLabel = 'Small'
			} else if (this.getNumCols === 0) {
                
				this.sliderLabel = 'Tiny'
                } 


        },


    },

    watch: {

        getNumCols() {
            
            this.gridSliderLabel()
        }

    },

    computed: {
        ...mapGetters(['getNumCols']),


        numCols: {
            get() {

                return this.getNumCols
            },
            set(val) {

                this.$store.dispatch('setNumCols', val)
            }
        }
    },


    created() {
        this.gridSliderLabel()
    }


    
}
</script>

<style lang="scss">

.grid-slider {

    position: absolute;
    top: -11px;
    right: 20px;
    width: 100px;



    .fa-th {

        position: absolute;
        top: 14px;
        right:110px;
        transition: transform 300ms ease;
        color: $color-active-but;


        &.active {

            color: $color-active-but;
            opacity: 1;
            transform: scale(1.3)
        }

    }



}
    // quasar hooks
    .q-slider__track-container {

        top: 50%;
        width: 100%;
        height: 3px;
        background: rgba(255, 255, 255, 0.6);
    }

    .q-slider {
        position: relative;
        width: 100%;
        height: 40px;
        color: $color-active-but;
        outline: 0;
    }

</style>