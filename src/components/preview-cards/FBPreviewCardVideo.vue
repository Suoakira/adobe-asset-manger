<template>
  <div class="fb-video-preview">

      <video @mouseover="playVideo($event)" @mouseout="stopVideo($event)" :ref="`videoPlayer_${file.label}`" :src="`file://${file.nodeKey}`" type="video/mp4" :controls="controls" loop muted></video>

  </div>
</template>

<script>
export default {
  props: {
    file: Object,
    // label: String,
    controls: Boolean,
    // isModalPreview: Boolean

  },
  methods: {
    playVideo(event) {

      event.target.play()
    },
    
    stopVideo(event) {

      event.target.pause()
    }
  }
};
</script>

<style lang="scss">
.fb-video-preview {

    text-align: center;
    padding-bottom: 56.25%;
    position: relative;


  .preview-video {

  }

  video {
    position: absolute;
    border-radius: 2px;
    max-height: 100%;
    max-width: 100%;

    transform: translate(-50%, -50%);
    top: 50%;
    // position: absolute;
  }
}
</style>