<template>
  <div>
    <c-father></c-father>
    <test-panel ref="panel" id="settingRow"></test-panel>
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
    <div class="corner"></div>
    <div class="popupone">00000000005</div>
 <!--   <div class="one">0050505
    </div>-->
<!--    <div class="two">006</div>-->
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
      this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: document.querySelector("#settingRow"),
        background: 'rgba(0, 0, 0, 0.7)'
      })
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

<style lang="scss" scoped>
  /*.corner{*/
  /*  width: 200px;*/
  /*  height: 50px;*/
  /*  background:*/
  /*    linear-gradient(135deg, transparent 15px, deeppink 0)*/
  /*    top left,*/
  /*    linear-gradient(0, transparent 0, deeppink 0)*/
  /*    top right,*/
  /*    linear-gradient(0, transparent 0, deeppink 0)*/
  /*    bottom right,*/
  /*    linear-gradient(0, transparent 0, deeppink 0)*/
  /*    bottom left;*/
  /*  background-size: 50% 50%;*/
  /*  background-repeat: no-repeat;*/
  /*}*/

  .one{
    &:before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      right: 2px;
      bottom: 2px;
      background:  rgba(0, 0, 255, 0.3) ;
      background: linear-gradient(135deg,transparent 15px, rgba(0, 0, 255, 0.3)  0)top left;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    /*&:after{*/
    /*  content: "";*/
    /*  position: absolute;*/
    /*  top: 2px;*/
    /*  left: 2px;*/
    /*  right: 2px;*/
    /*  bottom: 2px;*/
    /*  background: linear-gradient(0deg,#003a00 0%, green 100%);*/
    /*  background: linear-gradient(135deg,transparent 15px,#003a00 5%, green 100%)top left;*/
    /*  background-size: 100% 100%;*/
    /*  background-repeat: no-repeat;*/
    /*}*/
    position: relative;
    height: 200px;
    width: 200px;
    margin: 10px auto;
    line-height: 200px;
    background: green;
    background: linear-gradient(135deg,transparent 15px, green 0)top left;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
  }
  .two {
    height: auto;
    width: auto;
    margin: 10px auto;
    line-height: 200px;
    background: yellowgreen;
    background:
      linear-gradient(-45deg,transparent 15px, yellowgreen 0)bottom right;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .popupone {
    float: inline-end
  }

</style>
