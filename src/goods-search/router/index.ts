
import Vue from 'vue';
import Router from 'vue-router';
import Search from '../views/index.vue';
import Inclusion from '../views/inclusion.vue'

// @ts-ignore
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/inclusion',
      name: 'inclusion',
      component: Inclusion
    },
  ]
});