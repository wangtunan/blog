<template>
  <p class="leetcode-link">
    <a :href="link" target="_blank">
      <img
        :src="lcIcon"
        :alt="title"
      />
    </a>
  </p>
</template>
<script>
  export default {
    name: 'leetcode-link',
    props: {
      title: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      }
    },
    computed: {
      lcIcon () {
        return `https://img.shields.io/badge/LeetCode-${this.title}-blue?logo=leetcode`
      }
    }
  }
</script>