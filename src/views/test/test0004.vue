<template>
  <div>
    <!--<my-table-->
      <!--:dataSource="dataSource"-->
      <!--:columns="columns"-->
    <!--&gt;-->
    <!--</my-table>-->
    <!--<el-button type="info" plain  @click='test'>测试</el-button><br/>-->
    <!--<div>{{tryvalue}}</div>-->
    <div>{{count}}</div>
    <li v-for="(item, index) in picdata">
      <img :src="item.src"/>
    </li>

  </div>

</template>
<script>
  const  picdata = [{
    src: '404_images/404.png'
  },{
    src: '404_images/404_cloud.png'
  },{
    src: '404_images/404.png'
  },{
    src: '404_images/404_cloud.png'
  },{
    src: '404_images/404.png'
  },{
    src: '404_images/404_cloud.png'
  }]

  const bb =require("@/assets/404_images/404.png")
  import { mapGetters } from 'vuex'

  export default {
    // name: 'HelloWorld',
    data () {
      return {
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
      test() {
        this.$store.dispatch('user/trymethod', 'mobile') //触发
      },
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
