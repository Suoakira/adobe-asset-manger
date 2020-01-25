<template>
  <div class="navigation-bar">

    <div class="header-title">
      <h2>AE-Explorer</h2>
    </div>


    <div class="history-nav">
      <div class="history-btns">
        <i @click="backPath" class="fas fa-arrow-left"></i>
        <i @click="forwardPath" class="fas fa-arrow-right"></i>
      </div>

      <div class="stepback-btn">
        <i class="fas fa-level-up-alt"></i>
      </div>
      <!-- <i @click="refreshPath" class="fas fa-redo-alt"></i> -->
    </div>

    <q-input
      class="navigation-input"
      :value="getBrowserPath"
      @input="value => handleNavInput(value)"
    />

    <q-input class="browser-search" v-model="browserSearch"></q-input>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import fs from "fs-extra";

export default {
  data: () => ({
    browserPath: null, 
    toggleSearch: null,
  }),
  methods: {
    ...mapActions(["toggleDisplayView"]),
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
          this.$store.dispatch("navigatePath", splitPath.join("/"));
        }
      } else {
        this.$store.dispatch("navigatePath", "/");
      }
    }
  },

  computed: {
    ...mapGetters([
      "getBrowserPath",
      "getHistoryCounter",
      "getBrowserHistory",
      "getBrowserSearchTerm"
    ]),
    browserSearch: {
      get() {
        return this.getBrowserSearchTerm;
      },
      set(val) {
        this.$store.dispatch("setBrowserSearchTerm", val.toLowerCase());
      }
    }
  },
  watch: {
    browserSearch() {
      console.log("__ browser search term", this.getBrowserSearchTerm);
    }
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
  max-width: 980px;
  background: #272727;
  height: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);


  .header-title {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;

    height: 40px;
    width: 200px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 4px;

      h2 {
        position: relative;
        top: -10px;
        left: 21px;
        opacity: 0.6;


      }
  }

  .navigation-input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50%;
    height: 30px;
    background:black;
    border-radius: 4px;

    margin-left: 350px;;
    color: white;
  }

  .history-nav {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);


    .history-btns {
      position: relative;
      display: inline-block;
      left: 219px;
      // background: pink;
      padding: 2px 10px;
      border-radius: 4px;
    }

    .stepback-btn {
      left: 260px;
      position: relative;
      display: inline-block;
      // background: pink;
      padding: 2px 3px;
      border-radius: 4px;
    }
  }

  .browser-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 20px;
    background: yellow;
    right: 0;
  }

  // font awesome hooks
  .fas {
    color: white;
    opacity: 0.4;
    margin: 0px 4px;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
