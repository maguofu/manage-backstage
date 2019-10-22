<template>
  <div class="inclusion">
    <p class="read-file-err" v-if="readErr">{{readErr}}</p>
    <input type="file" class="choose-file" @change="inclusionImg">
    <div class="show-img-con" v-show="fileData">
      <img :src="fileData" alt="">
    </div>
    <div class="input-con name">
      <p>名称：</p>
      <input type="text" v-model="name">
    </div>
    <div class="input-con income">
      <p>进价：</p>
      <input type="number" v-model="inComePrice">
    </div>
    <div class="input-con sale">
      <p>售价：</p>
      <input type="number" v-model="salePrice">
    </div>
    <div class="input-con des">
      <p>描述：</p>
      <textarea name="" id="" cols="30" rows="10" v-model="description"></textarea>
    </div>
    <div class="submit" @click="inclusionSubmit">提交</div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import $http from '@src/api/api';
  @Component({
    components: {
    }
  })

  export default class Inclusion extends Vue {
    /**
     * 读取的文件数据（格式有二进制、base64，当前使用的是base64）
     * FileReader的实例的readAsBinaryString读取方法返回的是二进制
     */
    private fileData:any = '';
    // 文件读取失败的提示
    private readErr: string = '';
    // 录入的名称
    private name: string = '';
    // 录入的进价
    private inComePrice: number = 200;
    // 录入的售价
    private salePrice: number = 220;
    // 录入的描述
    private description: string = '';

    created() {
      if(typeof FileReader === 'undefined'){
        alert('抱歉，你的浏览器不支持读取文件 FileReader');
      }
    }
    /**
     * 读取文件方法（默认处理方式是图片资源）
     */
    inclusionImg(e: any){
      const file = e.target.files[0];
      // FileReader的实例
      const reader = new FileReader();
      // 读取文件内容，以base64格式返回结果
      const fileData = reader.readAsDataURL(file);
      // 读取文件成功回调
      reader.onload = () => {
        this.fileData = reader.result;
      };
      // 读取文件失败回调
      reader.onerror = () => {
        this.readErr = '文件读取失败，请重试';
        setTimeout(() => {
          this.readErr = '';
        }, 2000);
      }
    }
    /**
     * 提交接口
     */
    inclusionSubmit() {
      if (!this.fileData || !this.name || !this.inComePrice || !this.salePrice || !this.description) {
        alert('请录入完整信息！');
        return;
      }
      $http.inclusion({
        name: this.name,
        picData: this.fileData,
        inComePrice: this.inComePrice,
        salePrice: this.salePrice,
        description: this.description
      }).then((res:any) => {
        if (res.errNo){
          alert('录入失败，请重试！');
        }
      }).catch((e:any) => {
        console.log(JSON.stringify(e));
        alert('录入失败，请重试！');
      })
    }
  }
</script>
<style lang="less" scoped>
  .inclusion{
    padding-top: 1rem;
  }
  .read-file-err{
    position: fixed;
    padding: .2rem .6rem;
    background: #eee;
    border-radius: .3rem;
    left: 50%;
    transform: translateX(-50%);
    top: 2rem;
    font-size: .14rem;
    color: #333;
  }
  .choose-file{
    display: block;
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .show-img-con{
    width: 6rem;
    height: 3rem;
    overflow: auto;
    margin: 0 auto;
    margin-top: 1rem;
    border: 1px solid #ccc;
    img{
      border: none;
    }
  }
  .input-con{
    font-size: .2rem;
    color: #333;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: .3rem;
    padding: .1rem .3rem;
    min-height: 1rem;
    p,input{
      float: left;
      box-sizing: border-box;
    }
    >p{
      width: 15%;
    }
    >input{
      text-align: center;
    }
    >input,>textarea{
      width: 70%;
      margin-left: 4%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      color: #333;
    }
  }
  .submit{
    width: 2rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    border-radius: .2rem;
    border: 1px solid #ccc;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-size: .24rem;
  }
</style>

