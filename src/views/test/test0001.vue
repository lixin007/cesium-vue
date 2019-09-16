<template>
    <div class="app-container">
      <div :class="{'a1':true,'font-20':true}">css1</div>
      <div :class="[{'a1':true},css_font20]">css2</div>
      <div :class="[css_a2,css_font20]">css3</div>
      <div :class="classes">css3</div>
      <div :class="css_all">css5</div>
      <div :class="[isActive?css_a2:css_a1]">css6</div>
      <div :class="[isActive?{'a1':true}:{'a2':true}]">css6</div>
      <div :style="{ margin: '5px',fontSize: '20px',color:'red'}">css7</div>
      <div :style="style_a">css8</div>
      <div>
        <keep-alive>{{now}}</keep-alive>
      </div>

      <input @keyup.alt.67="runOK('bb')"  type="number" v-model.lazy.number="a"  >{{a}} {{ typeof(a) }}
      <el-button type="primary" plain  @click='runOK("666"),runOK("777")' :style="{margin: '5px'}">{{btnText}}</el-button>
      <form v-on:submit.prevent="runOK('555')">
        <input type="submit" value="提交">
      </form>

     <!-- <ul>
        <li  v-for="(item,index)  in syear" :key="index" class="a3">
          <b>{{item}}年</b>：<br/>
          {{Math.floor(Math.random()*5)}}:{{Math.floor(Math.random()*3)}}<br/>
        {{Math.floor(Math.random()*2)}}:{{Math.floor(Math.random()*3)}}
        </li>
      </ul>-->
       <ul>
          <li  v-for="(item,index)  in svalue" :key="index" class="a3">
              {{item}}
          </li>
      </ul>

      <svg-icon icon-class="password" />
      <my-try colorType="a-danger"></my-try>
      {{$msg}}
      <ElAlertTwo
        title="成功提示的文案666"
        type="success">
      </ElAlertTwo>
      <el-alert
        title="成功提示的文案"
        type="success">
      </el-alert>
      <Button>001</Button>

    </div>
</template>

<script>
    import { person,try66,box }  from "@/utils/glrandom"
    import alertTwo from "@/components/alert/src/main"
     import tsg from  "tsg1899"
    import { Button, Select } from 'element-ui'
    export default {
      name: "test0001",
      data(){
        return{
          syear: [2015,2016,2017,2018],
          svalue: 5,
          css_a1:'a1',
          css_a2:"a2",
          css_all: {
            "a1": true,
            "font-20": true,
          },
          style_a:{
            margin: '5px',
            background: 'green',
            fontSize:"20px",
            color: '#fff'
          },
          css_font20:"font-20",
          showred: true,
          error: {
            "type":"fail"
          },
          isActive:true,
          isError:null,
          a:50,
          b:2,
          testObj:{
            text1:'0001',
            text2:"0002"
          },
          btnText:"执行",
          btnValue:"执行成功"
        }
      },
      components: { alertTwo },
      mounted() {
        tsg.npmTest("84710")
        debugger
        tsg.yz()
        //this.tryrun("666")
        //alert(try66());
        const Person = new person('leon',30)
         console.log(Person.say())
        const Box = new box(3,5)
        console.log(Box.sum())
      },
      computed: {
        RandomColor(index) {
          let r, g, b;
          r = Math.floor(Math.random() * 256);
          g = Math.floor(Math.random() * 256);
          b = Math.floor(Math.random() * 256);
          return "rgb(" +r + ',' +g+ ',' +b+ ")";
        },
        // RandomNum(){
        //   let random = new GLRandom(40, 90)
        //   // 调整概率
        //   random.percentage = new Map([
        //     [41,0.02],   // 调整值为41的数值，概率为20%
        //     [46,0.01],   // 调整值为46的数值，概率为50%
        //     [90,0.05]   // 调整值为90的数值，概率为5%
        //   ]);
        //   // 生成值区间
        //   random.range()
        //   return random.create()
        // },
        now: function(){
          return Date.now()
        },
        classes(){
          return {
            'a2':this.isActive && this.showred,
            'font-20': this.error.type ==='fail'
          }
        }
      },
      methods: {
        runOK: function(param){
          alert(param+this.btnValue);
        },
        tryrun(){
          let Person = new Person('leon', 30)
          console.log(Person.say())
        }
      }
    }
</script>

<style scoped>
  .font-20{
    font-size: 20px;
  }
  .a1{
    margin: 5px;
    background: #409EFF;
    color: #fff;
  }
  .a2 {
    margin: 5px;
    background: red;
    color: #fff;
  }
  .a3 {
    margin: 10px;
  }
  .a4 {
    margin: 5px;
  }
</style>
