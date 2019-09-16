<template>
  <div>
    <el-tree
      :data="data2"
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>

    <div class="buttons">
      <el-button @click="getCurrentKey">getCurrentKey</el-button>
      <el-button @click="setCurrentKey">setCurrentKey</el-button>
      <el-button @click="getCurrentNode">getCurrentNode</el-button>
      <el-button @click="setCurrentNode">setCurrentNode</el-button>
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
    <video-player class="video-player vjs-custom-skin"
                  style="width:320px;height: 240px"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
    ></video-player>
    <br/>
    <div>{{count}}</div>
    <div id="dplayer" style="width: 320px;height: 240px;"></div>
    <li v-for="(item, index) in picdata">
      <img :src="item.src"/>
    </li>

  </div>
</template>
<script>

  const bb =require("@/assets/404_images/404.png")
  import { mapGetters } from 'vuex'
  import 'videojs-contrib-hls'

  export default {
    // name: 'HelloWorld',
    data () {
      return {
        playerOptions: {
          //controls: false,
          //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: 'auto', //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "application/x-mpegURL",
            src: "https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8" //你的m3u8地址（必填）
          }],
          poster: "poster.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
           controlBar: {
             timeDivider: true,
             durationDisplay: true,
             remainingTimeDisplay: false,
             fullscreenToggle: true  //全屏按钮
           }
        },
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        props: {
          label: 'name',
          children: 'zones'
        },
        dataSource:[], // 数据源
         aa:require("@/assets/404_images/404.png"),
         ab: bb,
        ac:[1,2,3],

        picdata2:'',
        picdata: [{
          id:1,
          src: '404_images/404.png'
        },{
          id:2,
          src: '404_images/404_cloud.png'
        },{
          id:3,
          src: '404_images/404.png'
        },{
          id:4,
          src: '404_images/404_cloud.png'
        },{
          id:5,
          src: '404_images/404.png'
        },{
          id:6,
          src: '404_images/404_cloud.png'
        }],
        columns: [{
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'createTime', //<String>  对应属性名
          label: '日期', //<String>   表头标签
          align: 'center',
          width: 200, // 列宽
        },
          {
            hasSort: false, //<Boolean> 是否排序
            isShow: true, //<Boolean> 是否展示
            prop: 'phone', //<String>  对应属性名
            label: '手机', //<String>   表头标签
            align: 'center'
          },
          {
            hasSort: true, //<Boolean> 是否排序
            isShow: true, //<Boolean> 是否展示
            prop: 'username', //<String>  对应属性名
            label: '名字', //<String>   表头标签
            align: 'center'
          },
          {
            hasSort: true, //<Boolean> 是否排序
            isShow: true, //<Boolean> 是否展示
            prop: 'deptName', //<String>  对应属性名
            label: '部门', //<String>   表头标签
            align: 'center'
          },
          {
            hasSort: true, //<Boolean> 是否排序
            isShow: true, //<Boolean> 是否展示
            prop: 'status', //<String>  对应属性名
            label: '状态', //<String>   表头标签
            align: 'center'
          }
        ]
      }
    },
    methods: {
      test2(){
        const acc = this.ac.map((item,index,arr)=>{
          return item*item
        })
        this.picdata.forEach((item,index,arr)=>{
          item.src = require("@/assets/"+ item.src)
          // return {
          //   id: item.id,
          //   src: require("@/assets/"+ item.src)
          // }
        })
        console.log(this.picdata)
        console.log(acc)
      },
      getCurrentKey(){
        console.log(this.$refs.tree.getCurrentKey());
      },
      setCurrentKey(){
        this.$refs.tree.setCurrentKey(2);
      },
      getCurrentNode(){
        if(this.$refs.tree.getCurrentNode()) {
          console.log(this.$refs.tree.getCurrentNode());
          console.log(this.$refs.tree.getCurrentNode().id);
        }
      },
      setCurrentNode() {
        this.$refs.tree.setCurrentKey([5]);
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }

    },
    computed: {
      ...mapGetters([
        'tryvalue',
      ]),
      count () {
        return this.$store.state.user.tryvalue
      }
    },
    mounted() {
      this.test2()
      const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        video: {
          url: 'https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8'
        },
      });
    }
  }
</script>
<style scoped>
  .index {
    width: 800px;
    margin: 0 auto;
    margin-top: 200px;
  }
</style>
