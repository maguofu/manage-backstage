<template>
  <div class="goods-search">
    <div class="search-con">
      <span class="button" @click="searchAction">查询</span>
      <input type="number" class="search-input" v-model="searchContent">
    </div>
    <div class="search-result" v-show="showSearchResult">
      <div class="name line">
        <p class="left">名称：</p>
        <p class="right">{{searchResult.name}}</p>
      </div>
      <div class="id line">
        <p class="left">id：</p>
        <p class="right">{{searchResult.id}}</p>
      </div>
      <div class="income-price line">
        <p class="left">进价：</p>
        <p class="right">{{searchResult.purchasePrice}}</p>
      </div>
      <div class="sale-price line">
        <p class="left">售价：</p>
        <p class="right">{{searchResult.salePrice}}</p>
      </div>
    </div>
    <div v-if="showErrTips" class="retry-con">
      <p class="retry" @click="retry">{{searchErrTips}}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import $http from '@src/api/api';
  @Component({
    components: {
    }
  })

  export default class Search extends Vue {
    // 要查询的id
    private searchContent: string = '';
    // 查询结果数据
    private searchResult: any = {};
    // 查询接口异常提示
    private searchErrTips: string = '查询失败，请稍后重试~';
    // 显示查询异常提示
    private showErrTips: boolean = false;

    /**
     * 是否要显示查询结果
     */
    get showSearchResult() {
      return JSON.stringify(this.searchResult) !== '{}';
    }
    created() {

    }
    /**
     * 查询接口
     */
    searchAction() {
      if (!this.searchContent) {return}
      $http.searchGoods({
        id: this.searchContent,
      }).then((res:any) => {
        if (!res.errNo) {
          this.searchResult = res.data;
          this.showErrTips = false;
        } else {
          this.showErrTips = true;
        }
      }).catch((e:any) => {
        this.showErrTips = true;
      });
    }
    /**
     * 重试按钮
     */
    retry() {
      this.searchAction();
    }
  }
</script>
<style lang="less" scoped>
  .search-con{
    padding: 0 .2rem;
    font-size: .4rem;
    color: #333;
    padding-top: 1rem;
    .button{
      display: inline-block;
      width: 1.5rem;
      height: .6rem;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: .1rem;
      margin-right: .5rem;
      box-sizing: border-box;
    }
    .search-input{
      width: 3rem;
      height: .6rem;
      border: 1px solid #ccc;
      box-sizing: border-box;
      position: relative;
      bottom: .07rem;
      border-radius: .1rem;
      text-align: center;
    }
    input[type="number"]:focus {
      border-radius: .1rem;
      border: 1px solid #ccc;
    }
  }
  .search-result{
    padding: 0 .2rem;
    overflow: hidden;
    font-size: .24rem;
    color: #333;
    margin-top: 1rem;
    .line{
      box-sizing: border-box;
      overflow: hidden;
      padding: .4rem 0;
      border-bottom: 1px solid #ccc;
      >p{
        float: left;
      }
      .left{
        width: 20%;
      }
      .right{
        width: 80%;
      }
    }
  }
  .retry-con{
    position: fixed;
    width: 3.5rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: .3rem;
    border: 1px solid #ccc;
    border-radius: .5rem;
    color: #333;
  }
</style>

