import jsonp from '../common/js/jsonp'
import {options} from './config'
import axios from 'axios'

// 获取歌手数据
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return res
  })
  // return jsonp(url, data, options)
}

// 获取歌手详情的数据
export function getSingerDetail(singerId){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({},{
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: jsonp,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singerId,
        order: 'listen',
        begin: 0,
        num: 200,
        songstatus: 1
    })
    return jsonp(url,data,options)
}