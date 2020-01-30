import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = {

	browser: {
		// current path
		path: "/",

		//history
		history: [],
		historyCounter: 1,

		searchTerm: "",

	},

	// favourite files and folders
	savedFolders: [],

	// contents in this path
	filesAndFolders: [],

	// selected preview file
	previewFile: null,

	// show browserWindowView or listView
	windowView: true,

	// get gridSize
	numCols: 5
};

export default {
	getters,
	mutations,
	actions,
	state
};
