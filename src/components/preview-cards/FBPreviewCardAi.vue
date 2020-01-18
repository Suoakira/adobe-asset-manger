<template>
  <div class="fb-image-preview">
    <div class="preview-image">
      <img src="../../assets/images/ai.png" />
    </div>
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
  text-align: center;
  position: relative;
//   padding-bottom: 56.25%;

  img {
    // width: 100%;
    border-radius: 2px;
    max-height: 100%;
    max-width: 100%;
    margin: auto;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
  }

}

</style>
    
