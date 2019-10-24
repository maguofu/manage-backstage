<template>
  <div class="inclusion">
    <p class="read-file-err" v-if="readErr">{{readErr}}</p>
    <input type="file" class="choose-file" multiple="multiple" @change="inclusionImg">
    <div class="show-img-con" v-show="fileData.length">
      <img v-for="(item, index) in fileData" :key="index" :src="item" alt="">
    </div>
    <div class="input-con id">
      <p>id：</p>
      <input type="number" v-model="id">
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
    <div class="submit" @click="inclusionSubmit" :class="[{'disabled': isSubmited}]">提交</div>
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
    private fileData:any = [];
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
    // id
    private id: any = null;
    // 当前执行getFileData函数的文件index
    currentIndex: number = 0;
    // 选择的文件列表
    filesList:any = [];
    // 当前选中的文件已经上传提交过
    isSubmited: boolean = false;

    created() {
      if(typeof FileReader === 'undefined'){
        alert('抱歉，你的浏览器不支持读取文件 FileReader');
      }
    }
    /**
     * 把已经读取的文件处理成可传输的文件数据（base64编码）
     */
    getFileData() {
      if (this.currentIndex === this.filesList.length) {return}
      let file = this.filesList[this.currentIndex];
      // FileReader的实例
      const reader = new FileReader();
      // 读取文件内容，以base64格式返回结果
      reader.readAsDataURL(file);
      // 读取文件成功回调
      reader.onload = () => {
        this.fileData.push(reader.result);
        this.currentIndex++;
        this.getFileData();
        console.log(this.fileData);
      };
      // 读取文件失败回调
      reader.onerror = () => {
        this.readErr = '文件读取失败，请重试';
        this.currentIndex++;
        this.getFileData();
        setTimeout(() => {
          this.readErr = '';
        }, 2000);
      }
    }
    /**
     * 读取文件方法（默认处理方式是图片资源）
     */
    inclusionImg(e: any){
      this.fileData = [];
      this.isSubmited = false;
      // 这是一个对象key是0，1，2，3...length
      const files = e.target.files;
      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          const element = files[key];
          if (key != 'length') {
            this.filesList.push(element);
          }
        }
      }
      this.getFileData();
    }
    /**
     * 提交接口
     */
    inclusionSubmit() {
      if (!this.fileData) {
        alert('没有上传的文件！');
        return;
      }
      if (this.isSubmited) {
        alert('当前选中的文件已经上传过！');
        return;
      }
      this.isSubmited = true;
      $http.inclusion({
        id: this.id,
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
      width: 100%;
      margin-top: .5rem;
      display: block;
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
  .disabled{
    background: #eee;
  }
</style>

