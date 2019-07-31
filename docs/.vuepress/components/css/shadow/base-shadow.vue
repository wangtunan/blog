<template>
  <div class="base-shadow">
    <div class="shadow-item" :style="getShadowStyle"></div>
    <el-checkbox-group v-model="shadow">
      <el-checkbox label="left">左侧投影</el-checkbox>
      <el-checkbox label="right">右侧投影</el-checkbox>
      <el-checkbox label="top">上侧投影</el-checkbox>
      <el-checkbox label="bottom">下侧投影</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'BaseShadow',
  data () {
    return {
      shadow: ['left', 'right']
    }
  },
  computed: {
    // 获取投影的样式
    getShadowStyle () {
      let arr = []
      let base = '5px 0 rgba(0,0,0,0.8)'
      if (this.shadow.includes('left')) {
        arr.push('-5px 0px ' + base)
      }
      if (this.shadow.includes('right')) {
        arr.push('5px 0px ' + base)
      }
      if (this.shadow.includes('top')) {
        arr.push('0px -5px ' + base)
      }
      if (this.shadow.includes('bottom')) {
        arr.push('0px 5px ' + base)
      }
      return {
        'box-shadow': arr.join(',')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .base-shadow
    margin-top: 30px;
    .shadow-item
      margin: 20px auto 30px;
      width: 300px;
      height: 110px;
      background-color: #58a;
</style>
