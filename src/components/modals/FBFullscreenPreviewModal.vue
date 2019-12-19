<template>
  <modal
    :clickToClose="true"
    name="fullscreen-preview"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    width="100%"
    height="100%"
    :adaptive="false"
    :scrollable="true"
    overlayTransition="false"
  >
    <div class="fb-modal-preview" @click="closePreview($event)">

    </div>
  </modal>
</template>
 
<script scoped>
import { mapActions, mapGetters } from "vuex";

import fs from "fs-extra"

export default {
  data() {
    return {};
  },
  props: {},
  components: {

  },
  methods: {
      closePreview() {
          this.$modal.hide("fullscreen-preview")
      }
  },
  computed: {
    ...mapGetters(["getPreviewFile"]),
  }
};
</script>

<style lang="scss">
.fb-modal-preview {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 100%;
  height: 100%;

  .modal-close-button {
    position: absolute;
    right: 1rem;
    display: block;
    top: 1rem;
    z-index: 20;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    font-size: 1.5rem;
    opacity: 0.4;
    color: white;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .center {
    text-align: center;
  }

  .folder-preview {
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
}

.v--modal-box {
  &.v--modal {
    background: rgba(0, 0, 0, 0);
  }
}
</style>

