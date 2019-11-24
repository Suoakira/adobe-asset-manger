import path from "path";
import mime from "mime-types";
import fs from "fs-extra";

import walkFolders from "../../../custom_modules/walk-folders";
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

  retrieveFolderContents({ commit, dispatch }, folder) {
    // some condition to update browser history

    if (true) {
      dispatch("updateBrowserHistory", folder);
    }

    console.log(folder);
    let folderContents = [];

    if (!folder || typeof folder !== "string") {
      return folderContents;
    }

    for (const fileInfo of walkFolders(folder, false)) {
      // all files and folders
      if ("error" in fileInfo) {
        console.log();
        console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`);
        continue;
      }
      const node = helperMethods.createNode(fileInfo);
      folderContents.push(node);

      commit("setFilesAndFolders", folderContents);
    }
  }
};

const helperMethods = {
  // helper method - clean up move out of store
  filterAndSetFilesAndFolders(filesAndFolders) {
    let folderContents = filesAndFolders.filter(
      fileOrFolder =>
        !blacklistedPaths.includes(fileOrFolder.nodeKey) &&
        fileOrFolder.label.charAt(0) !== "." &&
        fileOrFolder.label.substr(fileOrFolder.label.length - 4) !== ".app"
    );

    return folderContents;
  },

  // helper method - clean up move out of store
  mapFoldersToNodes(filesAndFolders) {
    return filesAndFolders.map(folder => ({
      title: folder.label,
      label: folder.label,
      truncatedName: helperMethods.truncate(folder.label, 19, "...", folder),
      isDir: folder.data.isDir,
      isExpanded: false,
      data: folder,
      children: []
    }));
  },

  // helper method - clean up move out of store
  truncate(fullStr, strLen, separator, folder) {
    if (!folder.data.isDir) {
      if (fullStr.length <= strLen) return fullStr;

      separator = separator || "...";

      var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2);

      return (
        fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
      );
    } else {
      if (fullStr.length <= strLen) return fullStr;

      return fullStr.substring(0, strLen) + separator;
    }
  },
  createNode(fileInfo) {
    let nodeKey = fileInfo.rootDir;

    if (nodeKey.charAt(nodeKey.length - 1) !== path.sep) {
      nodeKey += path.sep;
    }
    if (fileInfo.fileName === path.sep) {
      fileInfo.fileName = nodeKey;
    } else {
      nodeKey += fileInfo.fileName;
    }

    // get file mime type
    const mimeType = mime.lookup(nodeKey);

    // create object
    return {
      label: fileInfo.fileName,
      nodeKey: nodeKey,
      expandable: fileInfo.isDir,
      tickable: true,
      lazy: true,
      children: [],
      extension: path.extname(nodeKey),
      data: {
        rootDir: fileInfo.rootDir,
        isDir: fileInfo.isDir,
        mimeType: mimeType,
        stat: fileInfo.stat
      }
    };
  }
};
