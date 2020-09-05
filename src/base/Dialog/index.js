import Vue from 'vue'
import Dialog from './nwd-dialog.vue';

/* istanbul ignore next */
Dialog.install = function(Vue) {
  Vue.component(Dialog.name, Dialog);
};

export default Dialog;
