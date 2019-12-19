<template>
  <div class="navigation-bar">
    <div class="history-nav">
      <q-btn @click="backPath" color="white" text-color="black" label="<" />
      <q-btn @click="forwardPath" color="white" text-color="black" label=">" />
      <q-btn @click="refreshPath" color="white" text-color="black" label="R" />
      <q-btn @click="saveFolder" color="white" text-color="black" label="Star" />
      <q-btn @click="stepBackPath" color="white" text-color="black" label="^" />

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
      console.log(historyPath)

      if (fs.existsSync(historyPath)) {
        this.$store.dispatch(
          "retrieveFolderContents",
          `${historyPath}__HISTORY__`
        );
      }
    },

    saveFolder() {
      const isPathDirectory = fs.statSync(this.getBrowserPath).isDirectory();

      if (isPathDirectory) {
        //add to favourties
        this.$store.dispatch("addSavedFolder", this.getBrowserPath);
      } else {
        console.log("Sorry that isnt a folder");
      }
    },

    backPath() {
      this.$store.dispatch("incrementHistoryCounter");
      this.setHistoryPath();
    },

    forwardPath() {
      this.$store.dispatch("decrementHistoryCounter");
      this.setHistoryPath();
    },


		stepBackPath() {

			let splitPath = this.getBrowserPath.split("/");

			// check if we are at the root path
			if (splitPath[1] !== undefined) {
				splitPath.pop();

        // set root path
				if (splitPath.length === 1 && splitPath[0] === "") {

					this.$store.dispatch("navigatePath", "/");
				} else {
          // set steped back path
					this.$store.dispatch("navigatePath", splitPath.join("/"))
        }
			} else {
				this.$store.dispatch("navigatePath", "/");
			}
		},
  },

  computed: {
    ...mapGetters(["getBrowserPath", "getHistoryCounter", "getBrowserHistory"])
  },
  created() {
    this.handleNavInput(this.getBrowserPath);
  }
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  max-width: 780px;
  background: red;
  height: 40px;

  .navigation-input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50%;
    height: 20px;
    background: yellow;
    margin-left: 230px;
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
