<template>
    <div class="app-container">
      <el-button type="primary" plain  @click='runOK("666")'>确定</el-button>
    </div>
</template>

<script>
    export default {
      name: "test0001",
      methods: {
        runOK: function(param){
          alert(param);
        }
      }
    }
</script>

<style scoped>

</style>
