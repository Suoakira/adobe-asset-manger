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
  savedFolders: [],

  filesAndFolders: [],

  previewFile: null,
};

export default {
  getters,
  mutations,
  actions,
  state
};
