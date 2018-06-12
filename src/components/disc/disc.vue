<!-- Editor:xuyuchen -->
<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
import MusicList from '@/components/music-list/music-list'
import { mapGetters } from 'vuex'
import { DiscSong } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
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
    ...mapGetters([
      'disc'
    ]),
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    }
  },
  created() {
    this._getDisSong()
  },
  methods: {
    _getDisSong() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      DiscSong(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>