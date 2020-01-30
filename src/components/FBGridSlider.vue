<template>

    <div>

        <q-slider 
            v-model="numCols" 
            :step="1" 
            :min="0" 
            :max="8"
            label-always
            snap
        />

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

<style lang="scss" scoped>

</style>