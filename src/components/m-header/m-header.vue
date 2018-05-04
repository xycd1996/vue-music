<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Music</h1>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  @import '~@/common/stylus/variable'
  @import '~@/common/stylus/mixin'
  // css别名定位根目录引入样式前需加~
  .m-header
    position relative
    height 44px
    text-align center 
    color $color-theme
    font-size 0
    .icon
      display inline-block
      vertical-align top
      width 30px
      height 32px
      margin-top 6px
      margin-right 9px
      bg-image('logo')
      background-size 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
</style>
