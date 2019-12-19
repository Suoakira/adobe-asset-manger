import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import VModal from "vue-js-modal";
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

import FileBrowser from "./file-browser/index";


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      FileBrowser
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
