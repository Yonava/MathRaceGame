import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueMathJax from 'vue-mathjax'

Vue.use(VueMathJax);

// import firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyBfxKeiWX5qHzRevmE6nDMfDYeszitT_6s",
//   authDomain: "mathrace-firestore.firebaseapp.com",
//   projectId: "mathrace-firestore",
//   storageBucket: "mathrace-firestore.appspot.com",
//   messagingSenderId: "571576549165",
//   appId: "1:571576549165:web:49f98fe81b5341456f9da4",
//   measurementId: "G-ZK9V1TYG9Z"
// };

// firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
