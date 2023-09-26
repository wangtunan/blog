<template>
  <p class="link-and-solution">
    <a :href="challengeHref" target="_blank">
      <img
        src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white"
        alt="Take the Challenge"
      >
    </a>
    <a :href="solutionHref" target="_blank">
      <img
        src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white"
        alt="Check Out Solutions"
      >
    </a>
  </p>
</template>
<script>
export default {
  name: 'link-and-solution',
  props: {
    num: {
      type: String,
      required: true
    }
  },
  computed: {
    challengeHref () {
      return `https://tsch.js.org/${this.num}/play`
    },
    solutionHref () {
      return `https://tsch.js.org/${this.num}/solutions`
    }
  }
}
</script>
<style lang="scss" scoped>
  .link-and-solution {
    a {
      margin-right: 10px;
    }
  }
</style>