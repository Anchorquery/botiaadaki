import Vue from "vue";
import App from "./App";
import { apiUrl, url } from "./constants/config";
// BootstrapVue add
import BootstrapVue from "bootstrap-vue";
// Router & Store add
import router from "./router";
import store from "./store";
// Validacion
import Vuelidate from "vuelidate";
//import Notifications from "./components/Common/Notification";
import contentmenu from "v-contextmenu";
import Notifications from 'vue-notification';
import Viewer from "v-viewer";

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

// Import the CSS or use your own!


Vue.use(Viewer, {
  debug: true,
  defaultOptions: {
    zIndex: 9999
  }
});

import axios from "axios";
axios.defaults.baseURL = apiUrl;
axios.defaults.timeout = 300000;

window.axios = axios;

// verifico en el local storage si hay un token de nombre authorization

const token = localStorage.getItem("authorization");

// si hay un token lo agrego a los headers de axios como un bearer token

if (token) {

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

}



// Colxx Component Add
import Colxx from "./components/Common/Colxx";
// Perfect Scrollbar Add
import vuePerfectScrollbar from "vue-perfect-scrollbar";

import VueLineClamp from "vue-line-clamp";
import VueScrollTo from "vue-scrollto";
import vueScrollBehavior from "vue-scroll-behavior";
const moment = require('moment')
require('moment/locale/es')
 
Vue.use(require('vue-moment'), {
    moment
})
Vue.use(Notifications);
Vue.notify({
  duration:30000

})

Vue.use(vueScrollBehavior, {
  router: router // The router instance
  //el: '#app',        // Custom element
  //maxLength: 100,    // Saved history List max length
  //ignore: [/\/boo/, /\/zoo/],    // ignore some routes, they will directly scroll to the top
  //delay: 0          // Delay by a number of milliseconds
});

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(contentmenu);

Vue.use(require("vue-shortkey"));

Vue.use(VueScrollTo);
Vue.use(VueLineClamp, {
  importCss: true
});

Vue.component("b-colxx", Colxx);
Vue.component("vue-perfect-scrollbar", vuePerfectScrollbar);

/* import the fontawesome core */

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar,faFileAlt,faFolderPlus,faUser,faUserPlus, faFileCirclePlus, faHome, faArrowLeft, faEllipsisVertical, faFolder, faFolderOpen, faFile, faFileLines, faTrashCan} from "@fortawesome/free-solid-svg-icons";


library.add(faStar,faFileAlt,faFolderPlus,faUser,faUserPlus, faFileCirclePlus, faHome, faArrowLeft , faEllipsisVertical , faFolder , faFolderOpen, faFile, faFileLines, faTrashCan , faUser);

Vue.component('font-awesome-icon', FontAwesomeIcon)

// ckeditor<font-awesome-icon :icon="['far', 'comments']" />

import CKEditor from '@ckeditor/ckeditor5-vue2';
Vue.use( CKEditor );


Vue.use(VueSweetalert2);

// configuro toast de sweetalert2

const Toast = Vue.swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Vue.swal.stopTimer)
    toast.addEventListener('mouseleave', Vue.swal.resumeTimer)
  }
})

// hago disponible el toast en toda la app

Vue.prototype.$toast = Toast

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
