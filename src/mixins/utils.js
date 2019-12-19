
import sizeOf from "image-size";

export default {
    methods: {

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

        convertBytesToMegaBytes(bytes) {
            return (bytes / 1000000.0).toFixed(2);
        },
        
        // dimensions of image
        dimensions(path) {
            let dimensions = sizeOf(path);
            
            return `${dimensions.width}x${dimensions.height}px`;
        },
    },

}