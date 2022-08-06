import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCloudRain,
  faSun,
  faCloud,
  faCloudSun,
  faBoltLightning,
  faCloudBolt,
  faCloudShowersHeavy,
  faSmog,
  faSnowflake,
  faTemperatureHalf,
} from '@fortawesome/free-solid-svg-icons';
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/app.scss';
import '@/element-variables.scss';

library.add(
  faCloudRain,
  faSun,
  faCloud,
  faCloudSun,
  faBoltLightning,
  faCloudBolt,
  faCloudShowersHeavy,
  faSmog,
  faSnowflake,
  faTemperatureHalf
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
