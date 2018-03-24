<template>
  <div class="singer" ref="singer">
     <router-view></router-view>
    <singer-list :data="singers" @select="selectSinger" ref="list"></singer-list>
   
  </div>
</template>
<script>
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import Singer from '../../common/js/singer'
  import SingerList from '../../base/singerList/singerList'
  import {mapMutations} from 'vuex'
  import {playListMixin} from '../../common/js/mixin'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  
    export default {
      minxin:[playListMixin],
      data(){
        return {
            singers:[]
        }
      },
      created(){
        this._getSingerList()
      },
      components:{
          SingerList
      },
      methods:{
          handlePlayList(playlist){
            const bottom = playlist.length > 0 ?'60px':''
            this.$refs.signer.style.bottom = bottom
            this.$refs.list.refresh()
          },
          ...mapMutations({
              setSinger:'SET_SINGER'
          }),
          selectSinger(singer){
            this.$router.push({
              path:`/singer/${singer.id}`
            })
            //  this.setSinger(singer)
          },
        //   获取歌手列表的数据
          _getSingerList(){
            getSingerList().then(res=>{
              // console.log(res.data)
                if(res.data.code===ERR_OK){
                  this.singers = this._normalizeSinger(res.data.data.list)
                }
            })
          },
        //   格式化拿到的歌手数据 方便渲染数据
         _normalizeSinger(list){
             let map = {
                 hot:{
                     title:HOT_NAME,
                     items:[]
                 }
             }
             list.forEach((item,index)=>{
                 if(index < HOT_SINGER_LEN){
                   map.hot.items.push(new Singer({
                       id:item.Fsinger_mid,
                       name:item.Fsinger_name
                   }))
                 }
                //  key为歌手的姓=》字母
                const key = item.Findex
                // 如果map里面没有map[key] 你们就添加到map中去 如果有就不添加 所以这里不会添加重复的字母
                 if(!map[key]){
                   map[key] = {
                     title:key,
                     items:[]
                   }
                }
                map[key].items.push(new Singer({
                  id:item.Fsinger_mid,
                  name:item.Fsinger_name
                }))
             })
             let hot = []
             let ret = []
            //  遍历map
             for(let key in map){
                let val = map[key]
                // 如果在[a-zA-Z]能找到title就添加到ret中
                if(val.title.match(/[a-zA-Z]/)){
                  ret.push(val)
                  // 如果title==热门的时候就添加到hot中
                }else if(val.title === HOT_NAME){
                  hot.push(val)
                }
             }
            //  升序排序
            ret.sort((a,b)=>{
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
         }
      }
    }
</script>
<style lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
