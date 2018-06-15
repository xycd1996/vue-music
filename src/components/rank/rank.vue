<!-- Editor:xuyuchen -->
<template>
  <div class="rank" ref="rank" :data="ranks">
    <scroll class="toplist" ref="topList">
      <ul>
        <li class="item" v-for="rank in ranks" @click="selectItem(rank)">
          <div class="icon">
            <img width="100" height="100" v-lazy="rank.picUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(item, index) in rank.songList">
              <span> {{index + 1}} </span>
              <span> {{item.songname}}-{{item.singername}} </span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!ranks.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import { getRankList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import { mapMutations } from 'vuex'
import { playlistMixin } from '@/common/js/mixin'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      ranks: []
    }
  },
  components: {
    Scroll,
    Loading
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.topList.refresh() 
    },
    selectItem(rank) {
      this.$router.push(`/rank/${rank.id}`)
      this.setRank(rank)
    },
    _getRankList() {
      getRankList().then((res) => {
        if (ERR_OK === res.code) {
          this.ranks = res.data.topList
        }
      })
    },
    ...mapMutations({
      setRank: 'SET_RANK'
    })
  },
  created() {
    setTimeout(() => {
      this._getRankList()
    }, 500);
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '~@/common/stylus/variable'
@import '~@/common/stylus/mixin'

.rank
  position fixed
  width 100%
  top 88px
  bottom 0
  .toplist
    height 100%
    overflow hidden
    .item
      display flex
      margin 0 20px
      padding-top 20px
      height 100px
      &:last-child
        padding-bottom 20px
      .icon
        flex 0 0 100px
        width 100px
        height 100px
      .songlist
        flex 1
        display flex
        flex-direction column
        justify-content center
        padding 0 20px
        height 100px
        overflow hidden
        background $color-highlight-background
        color $color-text-d
        font-size $font-size-small
        .song
          no-wrap()
          line-height 26px
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>