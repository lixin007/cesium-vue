<template>
    <div>
      <el-tree
        draggable
        :data="data"
        :props="props"
        node-key="id"
        default-expand-all
        @node-contextmenu="rightClick"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag">
      </el-tree>

      <div id="perTreeMenu" v-if="addNodeDisplay" class="tree_menu" :style="{...rightMenu}">
        <ul>
          <li @click="showAddNode"><i class="el-icon-document-add"></i> 增加</li>
          <li @click="showEditNode"><i class="el-icon-document"></i> 编辑</li>
          <li @click="deleteNode"><i class="el-icon-delete"></i> 删除</li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "moduleTree",
      props: {
        data: Array,
        props: Object,
      },
      data() {
        return {
          addNodeDisplay: false,
          activeNode:{}
        };
      },
      methods: {
        rightClick(e,data,node,comp){

          console.log('e:',e,'data',data)
          console.log(node)
          console.log(comp)
          console.log(node.id)
          console.log(node.label)

          this.activeNode = {
            id: node.id,
            label: node.label
          }
          this.addNodeDisplay = false
          this.rightMenu = {top:e.pageY+'px',left:e.pageX+'px'}
          this.addNodeDisplay = true
          const self = this
          document.onclick=function(ev){
            if(ev.target!==document.getElementById('perTreeMenu')){
              self.addNodeDisplay = false
            }
          }
        },

        showAddNode(){
          alert("添加")
        },
        showEditNode(){
          alert("编辑")
        },
        deleteNode(){
          this.$confirm( '是否确定删除？ ('+ this.activeNode.label  +')', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            const activeNodeLabel = this.activeNode
            this.$emit('node-delete',activeNodeLabel)
          }).catch(() => {

          })
        },

        getNode(){
          const node = this.data
          this.$emit('node-get',node)
        },


        handleDragStart(node, ev) {
          console.log('drag start', node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
          console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
          console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
          console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
          console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
          console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
          if (dropNode.data.label === '二级 3-1') {
            return type !== 'inner';
          } else {
            return true;
          }
        },
        allowDrag(draggingNode) {
          return (['三级 3-2-1','三级 3-2-2'].indexOf(draggingNode.data.label)=== -1)
          // return !(['三级 3-2-1','三级 3-2-2'].includes(draggingNode.data.label))
        }
      }
    }
</script>

<style lang="scss" scoped>
  .tree_menu{
    position: fixed;
    display: block;
    z-index: 20000;
    background-color: #fff;
    padding:5px 0;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);

    ul{
      margin:0;
      padding:0;
      list-style-type:none;

      li{
        margin:0;
        padding:0 15px;
        font-size: 14px;
        line-height: 30px;
        cursor: Nodeer;
      }
      li:hover{
        background-color: #ebeef5
      }
    }
  }
</style>
