import Vue from "vue";
import Vuelidate from "vuelidate";
import Paginate from "vuejs-paginate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "@/directive/tooltip.directive";
import messagePlugin from "@/utils/message.plagin";
import Loader from "@/components/app/Loader";

import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyCUajNM8UASibqZnaEA6qz7ily6rWulRCE",
  authDomain: "vuejs-23df4.firebaseapp.com",
  projectId: "vuejs-23df4",
  storageBucket: "vuejs-23df4.appspot.com",
  messagingSenderId: "394840500871",
  appId: "1:394840500871:web:80544c39fee94bd7ff2622",
  measurementId: "G-VK961XRM3R",
});
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
