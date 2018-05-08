import jsonp from '@/common/js/jsonp'
import { commonParams, options } from '@/api/config'
import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    platform: 'yqq',
    uin: 0,
    needNewCode: 0
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })
  return jsonp(url, data, options)
}

export function getSongUrl(songmid) {
  const url = '/api/getSongUrl'

  const data = Object.assign({}, commonParams, {
    g_tk: 1819168215,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    songmid: songmid,
    uin: 0,
    filename: `C400${songmid}.m4a`,
    guid: 2926598324
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}