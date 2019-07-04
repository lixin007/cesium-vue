<template>
  <div>
    <my-table
      :dataSource="dataSource"
      :columns="columns"
    >
    </my-table>
    <el-button type="info" plain  @click='test'>测试</el-button><br/>
    <div>{{tryvalue}}</div>
    <div>{{count}}</div>
  </div>

</template>
<script>

  import { mapGetters } from 'vuex'

  export default {
    // name: 'HelloWorld',
    data () {
      return {
        dataSource:[], // 数据源
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

  }
</script>
<style scoped>
  .index {
    width: 800px;
    margin: 0 auto;
    margin-top: 200px;
  }
</style>
