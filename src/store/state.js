import { playMode } from '@/common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,// 默认顺序播放
  currentIndex: -1,
  disc: {},
  rank: {}
}

export default state