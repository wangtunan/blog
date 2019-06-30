<template>
  <div class="multi-line-text">
    <p>{{multiLineText}}</p>
    <el-input v-model="multiLineText" size="small" placeholder="请输入多行文本" clearable></el-input>
  </div>
</template>
<script>
export default {
  name: 'multi-line-text',
  data () {
    return {
      multiLineText: '非常长的数据非常长的数据非常长的数据非常长的数据非常长的数据非常长的数据非常长的数据'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .multi-line-text
    width: 100%
    & > p
      margin: 30px auto;
      width: 300px;
      min-height: 20px;
      border: 1px solid #58a;
      /* 关键性代码 */
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
</style>
