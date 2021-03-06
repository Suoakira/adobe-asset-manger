export default {
	getBrowserPath: state => state.browser.path,

	getFilesAndFolders: state => state.filesAndFolders,

	getBrowserHistory: state => state.browser.history,

	getHistoryCounter: state => state.browser.historyCounter,

	getSavedFolders: state => state.savedFolders,

	getPreviewFile: state => state.previewFile,

	getBrowserSearchTerm: state => state.browser.searchTerm,

	getNumCols: state => state.numCols,

	getRightSidebarExpanded: state => state.sidebar.rightSidebarExpanded,

	getShowUnsplashWindow: state => state.navbar.showUnsplashWindow
};
