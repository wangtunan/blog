<template>
  <div class="multiple-border"></div>
</template>
<script>
export default {
  name: 'MultipleBorder'
}
</script>
<style lang="stylus" scoped>
  .multiple-border
    margin: 20px 0;
    width: 100%;
    height: 100px;
    background-color: #58a;
    box-shadow: 0 0 0 10px #fb3;
    outline: 1px dashed #333;
    outline-offset: -10px;
    box-sizing: border-box;
</style>
