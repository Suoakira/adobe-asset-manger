<template>
  <div class="fb-image-preview">

      <img src="../../assets/images/aep.png" />

  </div>

</template>

<script>
export default {

    props: {
        file: Object
    }
    
}
</script>


<style lang="scss">

.fb-image-preview {
    height: 100%;
    width: 100%;
  
    position: relative;
//   padding-bottom: 56.25%;

  img {

    max-height: 100%;
    max-width: 100%;
    height: 100%;
    width: auto;

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

  }
}

</style>
    
