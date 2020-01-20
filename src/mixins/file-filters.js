import { Script } from "vm";

// contains filters used through the file browser
export default {

    methods: {

        isAepFile(file) {
            if (file !== null) {
                return file.label.substr(file.label.length - 4) === ".aep";
            }
        },

        isPsdFile(file) {
            if (file !== null) {
                return file.label.substr(file.label.length - 4) === ".psd";
            }
        },

        isIllustratorFile(file) {
            if (file !== null) {
                return file.label.substr(file.label.length - 3) === ".ai";
            }
        },

        isMimetype(file, type) {
            return file.mimeType && file.mimeType.includes(type);
        },

    },

    getAssetPaths(file) {
        if (isAepFile(file)) {

            return "../../assets/images/aep.png"
        } else if (isIllustratorFile(file)) {

            return "../../assets/images/ai.png"

            //check
        } else if (isMimetype(file)) {

            return "../../assets/images/mp3.jpg"

            //check
        } else if (isFolder) {

            return "../../assets/images/dark_folder.svg"

            //check
        } else if (isMimetype) {

            return `file://${file.nodeKey}`
        } else if (isPsdFile(file)) {

            return "../../assets/images/psd.png"
        }
    }
}