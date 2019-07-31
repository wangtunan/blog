<template>
  <div class="background-position">
    <div class="bg" :style="getBackgroundStyle()"></div>
    <el-form inline :model="form" size="small">
      <el-form-item label="水平方向：">
        <el-select v-model="form.horizontal">
          <el-option label="left" value="left"></el-option>
          <el-option label="center" value="center"></el-option>
          <el-option label="right" value="right"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="垂直方向：">
        <el-select v-model="form.vertical">
          <el-option label="top" value="top"></el-option>
          <el-option label="center" value="center"></el-option>
          <el-option label="bottom" value="bottom"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'BackgroundPosition',
  data () {
    return {
      form: {
        horizontal: 'left',
        vertical: 'top'
      }
    }
  },
  methods: {
    // 获取背景定位样式
    getBackgroundStyle () {
      return {
        'background-position': `${this.form.horizontal} ${this.form.vertical}`
      }
    }
  },
  watch: {
    form: {
      handler () {
        this.getBackgroundStyle()
      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  .background-position
    margin-top: 20px;
    .bg
      height: 150px;
      background: #58a url('/icon.png') no-repeat;
      background-size: 50px 50px;
    .el-form
      margin-top: 20px;
      >>> .el-form-item
        margin-bottom: 0
        .el-select
          width: 120px;
</style>
