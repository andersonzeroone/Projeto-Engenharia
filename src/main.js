import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import 'babel-polyfill';

import App from './App';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

Vue.directive('money', {
  inserted(el, binding){
      const amount = parseFloat(el.innerHTML).toFixed(2)
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
      el.innerHTML = `${binding.value} ${amount}`
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
