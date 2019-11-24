export default {
  setBrowserPath(state, path) {
    state.browser.path = path;
  },

  setFilesAndFolders(state, Fnf) {
    state.filesAndFolders = Fnf.slice();
  },

  // browser history
  addBrowserHistory(state, path) {
    state.browser.history.push(path);
  },

  removeBrowserHistory(state) {
    state.browser.history.shift();
  },

  incrementHistoryCounter(state, value) {
    state.browser.historyCounter += value;
  },

  decrementHistoryCounter(state, value) {
    state.browser.historyCounter -= value;
  },

  setHistoryCounter(state, value) {
    state.browser.historyCounter = value;
  }
};
