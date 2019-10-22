<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
  }
})
export default class GoodsSearch extends Vue {
  created() {
    
  }
}
</script>
<style lang="less">
  html,body,#app{
    height: 100%;
  }
</style>


