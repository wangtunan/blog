<template>
  <div class="box">
    <!-- 文字外发光 -->
    <div class="box-item light" v-show="index==1">我自横刀向天笑，去留肝胆两昆仑</div>
    <!-- 空心文字 -->
    <div class="box-item hollow" v-show="index==2" :style="getStyle">
      我自横刀向天笑，去留肝胆两昆仑
      <el-slider class="slider" v-model="sliderValue" :min="1" :max="5"></el-slider>
    </div>
    <!-- 文字模糊 -->
    <div class="box-item blur" v-show="index==3">
      <p>我自横刀向天笑，去留肝胆两昆仑</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SpecialEffect',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      sliderValue: 1
    }
  },
  computed: {
    getStyle () {
      return {
        'text-shadow': `${this.sliderValue}px ${this.sliderValue}px black,-${this.sliderValue}px -${this.sliderValue}px black,${this.sliderValue}px -${this.sliderValue}px black,-${this.sliderValue}px ${this.sliderValue}px black`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .box
    margin: 10px 0 45px;
    width: 100%;
    .box-item
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: #01ACB4;
      color: #fff;
      font-size: 18px;
      &.light
        text-shadow: 0 0 2px, 0 0 6px;
      &.hollow
        text-shadow: 1px 1px black,-1px -1px black, 1px -1px black,-1px 1px black;
        .slider
          margin: 10px auto 0px;
          width: 30%;
      &.blur
        & > p
          line-height: 60px;
        &:hover
          & > p
            // color: #000;
            // filter: blur(2px);
          color:transparent;
          text-shadow: 0 0 5px rgba(0,0,0,0.6);
</style>
