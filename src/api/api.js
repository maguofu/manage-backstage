

import $http from '@utils/api';
const apiInfo = {
  searchGoods: {
    url: `/study/mock/search`,
    method: 'post'
  },
};
export default {
  searchGoods: (params, options) => {
    return $http(apiInfo.searchGoods, params, options)
  },
}