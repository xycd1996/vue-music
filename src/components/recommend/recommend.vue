<template>
  <transition name="recommend">
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list" >
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img @load="_loadImage" width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <div class="desc">{{item.dissname}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div v-show="!discList.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
  </transition>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import Slider from '@/base/slider/slider'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading';

export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created() {
    this._getRecommend()
    setTimeout(() => {
      this._getDiscList()
    }, 500);
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    _loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'

.recommend-enter-active, .recommend-leave-active
  transition opacity .5s
.recommend-enter, .recommend-leave-to
  opacity 0
.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color $color-text-d
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>

