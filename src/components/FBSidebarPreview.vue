<template>

    <img v-if="getPreviewFile" :src="`file://${getPreviewFile.nodeKey}`"/>
    
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    computed: {
        ...mapGetters(["getPreviewFile"])
    }
    
}
</script>

<style lang="scss">

</style>