<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from '@/common/js/dom'

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: { // 循环
      type: Boolean,
      default: true
    },
    autoPlay: { // 自动轮播
      type: Boolean,
      default: true
    },
    interval: { // 时间间隔
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      // 方法调用排列顺序影响执行顺序以及部分共用值
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }// 初始自动轮播一次
    }, 20)

    this._resize()
  },
  methods: {
    _resize() {
      window.addEventListener('resize', () => {
        if (!this.sliderScroll) {
          return
        }
        this._setSliderWidth(true)
        this.sliderScroll.refresh()
      })
    },
    _play() {
      this.timer = setTimeout(() => {
        this.sliderScroll.next()
      }, this.interval);
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children // 获取该dom的子元素
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.sliderScroll = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        click: true,// 可能会于fastClick库冲突
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.sliderScroll.on('scrollEnd', () => {// 在sliderScroll 中插入一个 scrollEnd方法
        let pageIndex = this.sliderScroll.getCurrentPage().pageX
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          clearTimeout(this.timer)// 清除每次手动滑动之后的interval,用于达到每次手动/自动切换时，setTimeout都重新调用计算
          this._play()
        }// 因为每次滑动就会触发_initSlider该方法，因此每次都能触发_play，用于达到自动轮播的效果
      })
    }
  },
  destroyed() {
    clearTimeout(this.timer) // 当组件销毁的时候，清除记时器资源，有利于内部资源释放
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'

.slider
  min-height 1px
  .slider-group
    position relative
    overflow hidden
    white-space nowrap
    .slider-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      a
        display block
        width 100%
        overflow hidden
        text-decoration none
      img
        display block
        width 100%
  .dots
    position absolute
    right 0
    left 0
    bottom 12px
    text-align center
    font-size 0
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background $color-text-l
      &.active
        width 20px
        border-radius 5px
        background $color-text-ll
</style>
