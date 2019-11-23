<template>
  <div class="navigation-bar">
    <q-input
      class="navigation-input"
      :value="getBrowserPath"
      @input="(value) => handleNavInput(value)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    browserPath: null
  }),
  methods: {
    handleNavInput(value) {
      this.$store.dispatch("setBrowserPath", value);
    }
  },

  computed: {
    ...mapGetters(["getBrowserPath"])
  },
  watch: {
    getBrowserPath() {
      console.log(this.getBrowserPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  position: relative;
  width: 100%;
  background: red;
  height: 40px;

  .navigation-input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 80%;
    height: 20px;
    background: yellow;
  }
}
</style>