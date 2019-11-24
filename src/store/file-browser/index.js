import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = {
  browser: {
    path: "/",

    history: [],
    historyCounter: 1
    // historyFilesAndFolder: []
  },

  filesAndFolders: []
};

export default {
  getters,
  mutations,
  actions,
  state
};
