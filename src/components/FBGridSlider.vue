<template>

    <div class="grid-slider">

        <q-slider 
            v-model="numCols" 
            :step="1" 
            :min="0" 
            :max="6"
            label
            snap
        />

        <i class="fas fa-th"></i>

    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    data: () => ({

    }),

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
        color: $color-active-but;

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