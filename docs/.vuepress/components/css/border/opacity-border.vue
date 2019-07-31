<template>
  <div class="opacity-border">
    <el-checkbox label="0" v-model="isChecked">padding-box</el-checkbox>
    <div class="border-box" :style="getStyle"></div>
  </div>
</template>
<script>
export default {
  name: 'OpacityBorder',
  data () {
    return {
      isChecked: ''
    }
  },
  computed: {
    getStyle () {
      return {
        'background-clip': this.isChecked ? 'padding-box' : ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .opacity-border
    margin: 10px 0 20px;
    .border-box
      margin-top: 10px;
      height: 100px;
      background-color: #58a;
      border: 10px solid rgba(0,0,0,0.3);
</style>
