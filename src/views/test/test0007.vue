<template>
  <div>
    <div class="a-one">
      <tsg-button type="warning" size="large" value="a80"></tsg-button>
      <tsg-hello  msg="Welcome to zkxt-ui Demo666" />
      <tsg-el-button plain  type="success">信息按钮</tsg-el-button>
      <tsg-el-button  type="blue">信息按钮2</tsg-el-button>
      <svg-icon icon-class="glzicon" />
    </div>
    <child1
      :p-child1="child1"
      :p-child2="child2"
      v-on:test1="onTest1"
      v-on:test2="onTest2" />

    <div>
      <el-input v-model="a1" placeholder="请输入内容" style="width:100px"></el-input>
      <el-button type="primary"  @click=" showDFM">确定</el-button>
    </div>

    <vuedraggable class="wrapper" v-model="list">
      <transition-group>
        <div v-for="item in list" :key="item" class="item">
          <p>{{item}}</p>
        </div>
      </transition-group>
    </vuedraggable>
    <vue-toast-panel />
  </div>
</template>

<script>
     import Child1 from '@/components/MyComponents/test/attrchild.vue';
     import { fileNames } from '@/utils/tsg'
     import vuedraggable from 'vuedraggable'

    export default {
      name: "test0007",
      data(){
        return{
          a1:"113.211",
          value: [],
          msg:"999",
          child1:"v_child1",
          child2:"v_child2",
          list: [1,2,34,4,54,5],
          list2: [21,22,23,24,25,26],
        }
      },
      components: { Child1,vuedraggable },
      methods: {
        onTest1 () {
          console.log('test1 running...');
        },
        onTest2 () {
          console.log('test2 running');
        },
        changeToDFM(data){ // 经纬度坐标转换度分秒
          if (Number.isFinite(data)) {
            data = data.toString()
          }
          const arr1 = data.split(".")
          const d = arr1[0]
          let tp = "0." + arr1[1]
          tp = String(tp * 60)
          const arr2 = tp.split(".")
          const f = arr2[0];
          tp = "0." + arr2[1];
          tp = tp * 60;
          const m = tp;
          const dfm = d + "°" + f + "'" + m + "\""
          return dfm;
        },
        changeToDu(data) { //经纬度度分秒转换坐标系
          const arr1 = data.split('°');
          const d = arr1[0];
          const arr2 = arr1[1].split("'")
          let f = arr2[0] || 0;
          const m = arr2[1] || 0;
          f = parseFloat(f) + parseFloat(m / 60);
          let du = parseFloat(f / 60) + parseFloat(d);
          return du;
        },


        showDFM(){
          this.a1=this.changeToDFM(this.a1)
        },

     },
      updated() {
        console.log(this.list)
      },
      mounted () {
        this.$myMethod()

        /*const a1 = fileNames('../../icons/svg','svg')
        console.log(a1)*/
        const req = require.context('../../icons/svg', false, /\.svg$/)
        debugger
        const requireAll = requireContext => requireContext.keys()
        const re = /\.\/(.*)\.svg/
        const svgIcons = requireAll(req).map(i => {
          return i.match(re)[1]
        })
        console.log(svgIcons)
      }
    }
</script>

<style lang="scss" scoped>
  .a-one {
    font-size: 16px;
    color: red;
    overflow: hidden;
    .a-two {
      font-size: 0.875em;
    }
  }
  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .item{
    width: 300px;
    height: 50px;
    background-color: #42b983;
    color: #ffffff;
  }

</style>
