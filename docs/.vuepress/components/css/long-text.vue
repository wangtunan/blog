<template>
  <div class="long-text-container">
    <div class="long-text">{{longText}}</div>
    <div class="search-container">
      <el-input v-model="longText" class="long-text-input" placeholder="请输入长文本" clearable></el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LongText',
  data () {
    return {
      longText: '非常长的数据非常长的数据非常长的数据非常长的数据非常长的数据非常长的数据'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .long-text-container 
    .long-text
      margin: 30px 0;
      width: 100%;
      min-height: 50px;
      border: 1px solid #58a;
      // 关键性代码
      word-wrap:break-word;
      word-break: break-all;
</style>
