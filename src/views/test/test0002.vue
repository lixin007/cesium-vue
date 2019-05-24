<template>
  <div class="app-container">
    <el-input v-model="inputValue" placeholder="请输入内容" class="input-margin"></el-input>
    <div class="input-margin">{{inputText}}</div>
    <el-input v-model="message" placeholder="computed" class="input-margin"></el-input>

    <el-button type="primary" plain  @click='btnEvent()'>确定</el-button>
    <div class="input-margin">{{reversedMessage}}</div>
  </div>
</template>

<script>
    export default {
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
        }
      }
    }
</script>

<style scoped>
  .input-margin{
    margin: 5px;
  }

</style>
