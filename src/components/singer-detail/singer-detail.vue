<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/config'
import { getSingerDetail, getSongUrl } from '@/api/singer'
import { createSong } from '@/common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          getSongUrl(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              let vKey = res.data.items[0].vkey
              ret.push(createSong(musicData, vKey))
            }
          })
        }
      })
      return ret
    }
  },
  created() {
    this._getSingerDetail()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'

.singer-detail
  position fixed
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  background $color-background
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>

