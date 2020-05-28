<template>
    <div>
      <div style="margin: 10px">
        <module-tree
          :data="data"
          :props="props"
          @node-delete="nodeDelete"
          @node-get="nodeGet"
        />
      </div>

    </div>
</template>

<script>
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
        nodeDelete(node){
          alert(node.label +"已删除")
        },
        nodeGet(node){

        }
      },
    }
</script>

<style scoped>

</style>
