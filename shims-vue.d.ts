declare module "vue/types/vue" {
  import VueRouter, { Route } from "vue-router";
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $https: any; // 不知道类型就定为 any 吧（偷懒）
    $urls: any;
    $Message: any;
  }
}
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

