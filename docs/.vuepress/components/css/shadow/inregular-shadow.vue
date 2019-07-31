<template>
  <div class="inregular-shadow">
    <div class="shadow-item" :style="getShadowStyle"></div>
    <el-checkbox v-model="checkbox">drop-shadow</el-checkbox>
  </div>
</template>
<script>
export default {
  name: 'InregularShadow',
  data () {
    return {
      checkbox: false
    }
  },
  computed: {
    getShadowStyle () {
      return {
        'box-shadow': this.checkbox ? 'none' : '0 10px 8px rgba(0,0,0,0.8)',
        filter: this.checkbox ? 'drop-shadow(0 10px 8px rgba(0,0,0,0.8))' : 'none'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .inregular-shadow
    margin-top: 30px;
    .shadow-item
      position: relative;
      margin: 20px auto 30px;
      width: 300px;
      height: 110px;
      background-color: #58a;
      box-shadow: 0 5px 8px rgba(0,0,0,0.8);
      &::after
        content: '';
        position: absolute;
        left: 50%;
        bottom: -20px;
        margin-left: -10px;
        width: 0;
        height: 0;
        border: 10px solid #58a;
        border-color: #58a transparent transparent transparent;
</style>
