import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/layout.vue'

export default defineClientConfig({
  enhance ({ router }) {
    const isProduction = process.env.NODE_ENV === 'production'
    if (isProduction) {
      router.afterEach(function (to) {
        const fullPath = router.app.$withBase(to.fullPath);
        if (typeof _hmt !== 'undefined' && fullPath) {
          _hmt.push(["_trackPageview", fullPath]);
        }
      });
    }
  },
  layouts: {
    Layout
  }
})