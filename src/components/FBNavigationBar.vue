<template>
  <div class="navigation-bar">
    <div class="history-nav">
      <q-btn @click="backPath" color="white" text-color="black" label="<" />
      <q-btn @click="forwardPath" color="white" text-color="black" label=">" />
      <q-btn @click="refreshPath" color="white" text-color="black" label="R" />
    </div>
    <q-input
      class="navigation-input"
      :value="getBrowserPath"
      @input="value => handleNavInput(value)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fs from "fs-extra";

export default {
  data: () => ({
    browserPath: null
  }),
  methods: {
    handleNavInput(path) {
      this.$store.dispatch("setBrowserPath", path);
      if (fs.existsSync(path)) {
        this.$store.dispatch("retrieveFolderContents", path);
      }
    },

    refreshPath() {
      this.handleNavInput(this.getBrowserPath);
    },

    //
    setHistoryPath() {
      let historyPath = this.getBrowserHistory[
        this.getBrowserHistory.length - this.getHistoryCounter
      ];

      // if this is pressed dont add to history
      this.$store.dispatch("setBrowserPath", historyPath);
      console.log("__history path", historyPath);
      if (fs.existsSync(historyPath)) {
        this.$store.dispatch(
          "retrieveFolderContents",
          `${historyPath}__HISTORY__`
        );
      }
    },

    backPath() {
      this.$store.dispatch("incrementHistoryCounter");
      this.setHistoryPath();
    },

    forwardPath() {
      this.$store.dispatch("decrementHistoryCounter");
      this.setHistoryPath();
    }
  },

  computed: {
    ...mapGetters(["getBrowserPath", "getHistoryCounter", "getBrowserHistory"])
  },
  watch: {
    getBrowserPath() {}
  },
  created() {
    this.handleNavInput(this.getBrowserPath);
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
    margin-left: 130px;
  }

  .history-nav {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: purple;
  }
}
</style>
