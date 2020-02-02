import { Script } from "vm";
import path from "path"

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

        getAssetPaths(file) {
            if (this.isAepFile(file)) {

                return "file://" + path.resolve(__dirname + "../../assets/images/aep.png")
            } else if (this.isIllustratorFile(file)) {

                return "file://" + path.resolve(__dirname + "../../assets/images/ai.png")

            } else if (file.mimeType && this.isMimetype(file, "audio") && !this.isAepFile(file)) {

                return "file://" + path.resolve(__dirname + "../../assets/images/mp3.jpg")

            } else if (file.isDir) {

                return "file://" + path.resolve(__dirname + "../../assets/images/dark_folder.svg")

                //check
            } else if (file.mimeType && this.isMimetype(file, 'image') && !this.isPsdFile(file)) {
                
                return `file://${file.nodeKey}`
                
            } else if (this.isPsdFile(file)) {

                return "file://" + path.resolve(__dirname + "../../assets/images/psd.png")
            }
        }
    },

}