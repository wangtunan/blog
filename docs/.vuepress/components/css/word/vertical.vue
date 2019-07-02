<template>
  <div class="vertical">
    <div class="theme-bg" :style="getStyle">
      北冥有鱼，其名为鲲。鲲之大，不知其几千里也；化而为鸟，其名为鹏。鹏之背，不知其几千里也；怒而飞，其翼若垂天之云。
    </div>
    <el-radio-group v-model="radio">
      <el-radio label="horizontal-tb">horizontal-tb</el-radio>
      <el-radio label="vertical-lr">vertical-lr</el-radio>
      <el-radio label="vertical-rl">vertical-rl</el-radio>
    </el-radio-group>
  </div>
  
</template>
<script>
export default {
  name: 'VerticalText',
  data () {
    return {
      radio: 'vertical-lr'
    }
  },
  computed: {
    getStyle () {
      return {
        'writing-mode': this.radio
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .vertical
    margin: 20px auto;
    width: 100%;
    .theme-bg
      margin-bottom: 20px;
      width: 100%;
      height: 100px;
      box-sizing: border-box;
</style>
