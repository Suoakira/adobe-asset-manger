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
  },

  saveAsFavFolder(state, folderPath) {

    if (state.savedFolders.includes(folderPath)) {

      state.savedFolders = state.savedFolders.filter(folderPath => folderPath !== folderPath)
    } else {
      state.savedFolders.push(folderPath);
    }
  },

  removeSavedFolder(state, passedPath) {
    state.savedFolders = state.savedFolders.filter(path => path !== passedPath);
  },

  setPreviewFile(state, file) {
    state.previewFile = file
  },

  setBrowserSearchTerm(state, searchTerm) {
    state.browser.searchTerm = searchTerm
  },

};
