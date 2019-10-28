

import $http from '@utils/api';
const apiInfo = {
  searchGoods: {
    url: `/study/mock/search`,
    method: 'post'
  },
  inclusion: {
    url: `/study/mock/acceptimg`,
    method: 'post'
  },
};
export default {
  searchGoods: (params:any, options?:any) => {
    return $http(apiInfo.searchGoods, params, options)
  },
  inclusion: (params:any, options?:any) => {
    return $http(apiInfo.inclusion, params, options)
  },
  
}