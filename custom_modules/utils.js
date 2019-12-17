

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