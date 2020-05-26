<template>
  <div class="app-container">
    <el-input v-model="inputValue" placeholder="请输入内容" class="input-margin"></el-input>
    <div class="input-margin">{{inputText}}</div>
    <el-input v-model="message" placeholder="computed" class="input-margin"></el-input>
    <div class="input-margin">{{reversedMessage}}</div>
    <el-button type="primary" plain  @click='btnEvent'>
      <svg-icon icon-class="dashboard" style="margin: 0 5px;"/>确定</el-button>
    <my-components
      name="0001"
    ><span slot='header' style="color: red;">自定义标题</span></my-components>
  </div>
</template>

<script>
  import MyComponents from "@/components/MyComponents/index.vue"
    export default {
      components:{
        "my-components":MyComponents
      },
      name: "test0002",
      data(){
        return{
          inputValue:1,
          inputText:"",
          message: ''
        }
      },
      computed: {
        // 计算属性的 getter
        reversedMessage: function () {
          // `this` 指向 vm 实例
          return this.message.split('').reverse().join('')
        }
      },
      watch: {
        inputValue(val,oldval){
          this.inputText = "新值："+val+",旧值"+oldval;
        }
      },
      methods: {
        btnEvent: function(param){
          this.inputValue += 1;
          console.log(vm.data);
          console.log(vm.props);
          console.log(vm.el);
        }
      }
    }
</script>

<style scoped>
  .input-margin{
    margin: 5px;
  }

</style>
