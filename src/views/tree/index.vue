<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
    <div v-for="(item) in data2" :key="item.id">
      <el-col :span="4">
        <el-button type="info" @click="show(item)">{{item.label}}</el-button>
        <el-switch
          v-if="item.visiable"
        active-color="#13ce66"
        inactive-color="#ff4949">
        </el-switch>
      </el-col>
    </div>

    <div class="a1">
      6666
    </div>
    <div class="one">12345</div>
    <div class="two">abcde</div>


  </div>
</template>

<script>
export default {

  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: 'Level one 1',
        visiable: false,
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        visiable: false,
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        visiable: false,
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    show(item) {
      item.visiable = !item.visiable
    }
  }
}
</script>

<style lang="scss" scoped>
  .a1 {
    font-size: 20px;
    &:before {
      width: 50px;
      height: 100px;
      content: "91119";
      color: #fff;
      background: red;
    }
    &:after {
      width: 100px;
      height: 100px;
      content: "99999999999";
      background: green;
     }
  }

  .one{
    height: 200px;
    width: 200px;
    margin: 10px auto;
    line-height: 200px;
    background: yellowgreen;
    background:
      linear-gradient(0deg,#000 1px, yellowgreen 3px)bottom right,
      linear-gradient(0deg,#000 1px, yellowgreen 3px)top right,
        linear-gradient(135deg,transparent 15px, yellowgreen 20px)top left,
      linear-gradient(135deg,transparent 14px, #000000 20px)top left,
      linear-gradient(0deg,#000 1px, yellowgreen 3px)bottom left;
    background-size: 50% 57%;
    background-repeat: no-repeat;
  }
  .two{
    height: 200px;
    width: 200px;
    margin: 10px auto;
    background: #58a;
    line-height: 200px;
    background:
      radial-gradient(circle at bottom right,transparent 15px, #58a 0)bottom right,
      radial-gradient(circle at top right,transparent 15px, #58a 0)top right,
      radial-gradient(circle at top left,transparent 15px, #58a 0)top left,
      radial-gradient(circle at bottom left,transparent 15px, #58a 0)bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
  }
</style>

