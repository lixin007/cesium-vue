<template>
  <div>
    <c-father></c-father>
    <test-panel ref="panel"></test-panel>
    <test-toast ref="toast"></test-toast>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name.id"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import cFather from "@/components/MyComponents/c-father.vue"
  import {Point} from "@/utils/myutils"
  export default {
    name: "test0003",
    data(){
      return{
        testArr:[1,2,5],

       tableData: [{
         date: '2016-05-02',
         name: {
           id: "001"
         },
         address: '上海市普陀区金沙江路 1518 弄'
       }]
      }
    },
    created(){
      console.log(this.$msg);
      console.log(this.$myMethod(this.testArr));
      this.$nextTick(() =>{
        console.log("666")
        console.log(this.$refs.panel.$el);
      })
    },
    mounted() {
      const p = new Point(1,2);
      p.y = 3
      p.showValue()
      p.showC()
    },
    components: {
      "c-father": cFather
    },
  }
</script>

<style scoped>

</style>
