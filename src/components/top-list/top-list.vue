<!-- Editor:xuyuchen -->
<template>
  <transition name="slide">
    <div class="top-list">
      <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
import MusicList from '@/components/music-list/music-list'
import { getRankSong } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'
import { createSong } from '@/common/js/song'

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
      return this.rank.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'rank'
    ])
  },
  methods: {
    _getRankSong() {
      if (!this.rank.id) {
        this.$router.push('/rank')
        return
      }
      getRankSong(this.rank.id).then((res) => {
        if (ERR_OK === res.code) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.data.songid && musicData.data.albummid) {
          ret.push(createSong(musicData.data))
        }
      })
      return ret
    }
  },
  created() {
    this._getRankSong()
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.top-list
  position fixed
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  background $color-background
</style>