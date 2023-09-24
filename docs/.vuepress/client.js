export default ({router}) => {
  // UA统计
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    router.afterEach(function (to) {
      const fullPath = router.app.$withBase(to.fullPath);
      if (typeof _hmt !== 'undefined' && fullPath) {
        _hmt.push(["_trackPageview", fullPath]);
      }
    });
  }
}