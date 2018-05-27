<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { ERR_OK } from '@/api/config'
import { getSingerDetail, getSongUrl } from '@/api/singer'
import { createSong } from '@/common/js/song'
import MusicList from '@/components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
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
          ret.push(createSong(musicData))
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

