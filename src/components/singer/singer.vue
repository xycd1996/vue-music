<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" ref="list" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import singer from '@/common/js/singer'
import ListView from '@/base/listview/listview'
import { mapMutations } from 'vuex'// 语法糖，对mu

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new singer(
            item.Fsinger_mid,
            item.Fsinger_name
          ))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new singer(
          item.Fsinger_mid,
          item.Fsinger_name
        ))
      })
      // 为了得到有序列表，需要处理map
      let hot = []
      let ret = []
      let spe = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        } else {
          val.title = '#'
          spe.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret, spe)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position fixed
  top 88px
  bottom 0
  width 100%
</style>

