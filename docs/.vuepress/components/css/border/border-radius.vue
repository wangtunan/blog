<template>
  <div class="border-radius">
    <div class="item radius" v-if="index==1"></div>
    <div class="item outline" v-if="index==2"></div>
    <div class="item combine" v-if="index==3" :style="getStyle"></div>
    <template v-if="index == 3">
      <el-checkbox label="1" v-model="checkbox">box-shadow</el-checkbox>
      <template v-if="checkbox">
        边框的大小：<el-input-number v-model="number" size="small" :max="8" :min="1"></el-input-number>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'BorderRadius',
  props: {
    index: {
      type:Number,
      default: 1
    }
  },
  data () {
    return {
      checkbox: true,
      number: 6
    }
  },
  computed: {
    getStyle () {
      return {
        'box-shadow': this.checkbox ? `0 0 0 ${this.number}px #fb3` : ''
      }
    }
  },
  watch: {
    checkbox (newVal) {
      if (newVal) {
        this.number = 6
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .border-radius
    margin: 20px 0;
    .item
      height: 50px;
      background-color: #58a;
      border-radius: 15px;
    .radius
      box-shadow: 0 0 0 5px #fb3;
    .outline
      outline: 6px solid #fb3;
    .combine
      margin-bottom: 20px;
      height: 80px;
      outline: 8px solid #fb3;
</style>
