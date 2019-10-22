

import Vue from 'vue';
import router from './router/index.ts';
import App from './goods-search.vue';
// @ts-ignore
Vue.config.productionTip = false;
// @ts-ignore
Vue.config.devtools = process.env.NODE_ENV !== 'production';
new Vue({
  router,
  render: (h: any):any => h(App)
}).$mount("#app")