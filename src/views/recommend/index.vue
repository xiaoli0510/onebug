<template>
  <div class="recommend" ref="recommend">
    <Scroll class="recomment-content" ref="scroll" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="recommendList.length">
          <slider>
            <!-- slot -->
            <div v-for="item in recommendList" :key="item.key">
              <a :href="item.linkUrl">
                <img @load="loadImage" class="needsclick" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,key) in discList" :key="key" class="item" @click="selectItem(item)"></li>
          </ul>
        </div>
      </div>
    </Scroll>
      
  </div>
</template>
<script>
  import Scroll from '../../base/scroll'
  import Slider from '../../base/slider'
  import {getRecommend,getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  export default {
    data(){
      return{
        recommendList:[],
        discList:[]
      }
    },
    components:{
      Scroll,
      Slider
    },
    created(){
      this._getRecommend()
      this._getDiscList()
    },
    methods:{
      loadImage(){
        if(!this.checkedload){
          this.$refs.scroll.refresh()
          this.checkedload=true
        }
      },
      selectItem(item){
        this.$router.push({
          path:`/recommend/${item.dissid}`
        })
      },
      // 获取轮播图的数据并渲染
      _getRecommend(){
         getRecommend().then(res=>{
           if(res.data.code==ERR_OK){
          this.recommendList=res.data.data.slider
           }
          
        })
      
      },
      _getDiscList(){
        getDiscList().then(res=>{
          alert(1)
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>


