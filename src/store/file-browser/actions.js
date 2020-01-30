import path from "path";
import mime from "mime-types";
import fs from "fs-extra";

import blacklistedPaths from "./blacklisted-paths";

export default {
	setBrowserPath({ commit }, path) {

		commit("setBrowserPath", path);
	},

	updateBrowserHistory({ commit, getters }, path) {

		const { getBrowserHistory } = getters;
		let lastPath = getBrowserHistory[getBrowserHistory.length - 1];

		const pathValid = fs.existsSync(path);

		if (getBrowserHistory.length > 20 && lastPath != path && pathValid) {

			commit("removeBrowserHistory");
			commit("addBrowserHistory", path);
		} else if (lastPath != path && pathValid) {

			commit("addBrowserHistory", path);
		}
	},


	retrieveFolderContents({ commit, dispatch }, folderPath) {

		// hack way of telling if the path is coming from history nav buttons
		if (!folderPath.includes("__HISTORY__")) {

			dispatch("setHistoryCounter");
			dispatch("updateBrowserHistory", folderPath);
		} else {

			folderPath = folderPath.slice(0, folderPath.length - 11);
		}

		const isDir = fs.lstatSync(folderPath).isDirectory();

		const folderContents = isDir ? fs.readdirSync(folderPath) : []
		const mapedNodes = helperMethods.filterFilesAndFolders(folderContents).map(fileOrFolder => helperMethods.createNode(fileOrFolder, folderPath));

		if (folderContents.length > 0) {
			commit("setFilesAndFolders", mapedNodes);
		}

	},

	navigatePath({ commit, dispatch }, path) {

		dispatch("setBrowserPath", path);

		if (fs.existsSync(path)) {

			dispatch("retrieveFolderContents", path);
		}
	},

	setHistoryCounter({ commit }, value = 1) {

		commit("setHistoryCounter", value);
	},

	incrementHistoryCounter({ commit, getters }, value = 1) {

		if (getters.getHistoryCounter < getters.getBrowserHistory.length) {

			commit("incrementHistoryCounter", value);
		}
	},

	decrementHistoryCounter({ commit, getters }, value = 1) {

		if (getters.getHistoryCounter > 1) {

			commit("decrementHistoryCounter", value);
		}
	},

	saveAsFavFolder({ commit }, folder) {

		const {isDir, nodeKey} = folder

		if (isDir) {

			commit("saveAsFavFolder", nodeKey);
		} else {

			console.log("Sorry that isnt a folder");
		}
	},

	removeFavFolder({commit}, path ) {

		commit("removeSavedFolder", path)
	},

	setPreviewFile({ commit }, file) {

		commit("setPreviewFile", file)
	},

	setBrowserSearchTerm({ commit }, searchTerm) {

		commit("setBrowserSearchTerm", searchTerm)
	},

	toggleDisplayView({commit}) {

		commit("toggleDisplayView")
	},

	setNumCols({ commit }, numCols) {
		
		commit("setNumCols", numCols)
	}
};

const helperMethods = {

	filterFilesAndFolders(filesAndFolders) {

		let folderContents = filesAndFolders.filter(

			fileOrFolder =>

				// !blacklistedPaths.includes(fileOrFolder.nodeKey) &&
				fileOrFolder.charAt(0) !== "." &&
				fileOrFolder.substr(fileOrFolder.length - 4) !== ".app"

		);

		return folderContents;
	},

	createNode(file, folderPath) {

		const nodeKey = folderPath + "/" + file

		const fileStats = fs.lstatSync(nodeKey)
		// get file mime type
		const mimeType = mime.lookup(nodeKey);

		// create object
		return {
			label: file,
			nodeKey: nodeKey,
			isDir: fileStats.isDirectory(),
			extension: path.extname(nodeKey),
			rootDir: folderPath,
			mimeType: mimeType,
			stat: fileStats,
			children: []
		};
	}
};
