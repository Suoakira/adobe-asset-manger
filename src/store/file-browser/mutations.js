export default {
  setBrowserPath(state, path) {
    state.browser.path = path;
  },

  setFilesAndFolders(state, Fnf) {
    state.filesAndFolders = Fnf.slice();
  }
};
