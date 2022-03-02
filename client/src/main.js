import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueMathJax from 'vue-mathjax'

Vue.config.productionTip = false;
Vue.use(VueMathJax);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
