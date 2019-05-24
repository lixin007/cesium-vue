<template>
    <div class="app-container">
      <div :class="{'a1':true,'font-20':true}">css1</div>
      <div :class="[{'a1':true},css_font20]">css2</div>
      <div :class="[css_a2,css_font20]">css3</div>
      <div :class="classes">css4</div>
      <div :class="css_all">css5</div>
      <div :class="[isActive?css_a2:css_a1]">css6</div>
      <div :class="[isActive?{'a1':true}:{'a2':true}]">css6</div>
      <div :style="{ margin: '5px',fontSize: '20px',color:'red'}">css7</div>
      <div :style="style_a">css8</div>
      <div>
        <keep-alive>{{now}}</keep-alive>
      </div>
      <mycomponent></mycomponent>
      <input @keyup.alt.67="runOK('bb')"  type="number" v-model.lazy.number="a"  >{{a}} {{ typeof(a) }}
      <el-button type="primary" plain  @click='runOK("666"),runOK("777")' :style="{margin: '5px'}">{{btnText}}</el-button>
      <form v-on:submit.prevent="runOK('555')">
        <input type="submit" value="提交">
      </form>

    </div>
</template>

<script>
    export default {
      name: "test0001",
      components: {
        'mycomponent': {
          template: `<div>这是一个局部的自定义组件，只能在当前Vue实例中使用</div>`,
        }
      },
      data(){
        return{
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
      computed: {
        RandomColor(index) {
          let r, g, b;
          r = Math.floor(Math.random() * 256);
          g = Math.floor(Math.random() * 256);
          b = Math.floor(Math.random() * 256);
          return "rgb(" +r + ',' +g+ ',' +b+ ")";
        },
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
</style>
