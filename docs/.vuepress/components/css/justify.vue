<template>
  <div class="box">
    <div class="box-item" v-for="(item,index) in list" :key="index">
      <span class="title">{{item}}</span>：
      <span class="desc">这里是{{item}}的内容</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlignJustify',
  data () {
    return {
      list: ['姓名', '收货地址', '手机号', '性别', '订单总额']
    }
  }
}
</script>
<style lang="stylus" scoped>
  .box
    margin: 20px 0;
    .box-item
      padding: 5px 0;
      .title
        width: 100px;
        display: inline-block;
        text-align:justify;
        text-align-last: justify;
</style>
