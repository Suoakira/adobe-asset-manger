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

    }
}