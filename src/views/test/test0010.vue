<template>
    <div>

      <div style="margin: 10px;width: fit-content;" >
        <module-tree
          :data="data"
          :props="props"
          @node-delete="nodeDelete"
          @node-get="nodeGet"
          style="margin: 0 20px;"
        />
        <div style="margin: 10px 0">
          <el-button size="mini" @click="nodeSave" style="float: right;">保存</el-button>
        </div>
        <kui-button text="0001" size="small" />
      </div>

    </div>
</template>

<script>
    import { findTreeNode } from '@/utils/tsg'
    import  { ModuleTree }  from 'KUI'
    export default {
      name: "test0010",
      data(){
          return {
            data: [{
              id: 1,
              text: '一级 1',
              children: [{
                id: 4,
                text: '二级 1-1',
                children: [{
                  id: 9,
                  text: '三级 1-1-1'
                }, {
                  id: 10,
                  text: '三级 1-1-2'
                }]
              }]
            }, {
              id: 2,
              text: '一级 2',
              children: [{
                id: 5,
                text: '二级 2-1'
              }, {
                id: 6,
                text: '二级 2-2'
              }]
            }, {
              id: 3,
              text: '一级 3',
              children: [{
                id: 7,
                text: '二级 3-1'
              }, {
                id: 8,
                text: '二级 3-2',
                children: [{
                  id: 11,
                  text: '三级 3-2-1'
                }, {
                  id: 12,
                  text: '三级 3-2-2'
                }, {
                  id: 13,
                  text: '三级 3-2-3'
                }]
              }]
            }],
            props: {
              children: 'children',
              label: 'text'
            }
          }
        },
      methods:{
        nodeSave(){
          console.log(this.data)
        },
        nodeDelete(node){
          let treeNode = findTreeNode(this.data,9)
          if (treeNode) {
            _.pull(this.data,treeNode)
          }
          console.log(this.data)
        },
        nodeGet(node){

        }
      },
      beforeRouteLeave(to, from, next) {
        debugger
        console.log(from.meta.keepAlive)
        next();
      }
    }
</script>

<style scoped>

</style>
