<template>
    <div>
      <span :class="colorType">显示我的组件show me</span>
      <span class="el-icon-success">0550</span>
    </div>
</template>

<script>
    export default {
        name: "my-try",
        props: {
          colorType: {
            type: String,
            default: ''
          }
        },
      data() {
        return {
          aSuccess: 'a-success',
          aDanger: 'a-danger',
        };
      },
    }
</script>

<style scoped>
   .a-success {
     color: green;
   }
  .a-danger {
    color: red;
  }
  .font-big {
    font-size: 50px;
  }
</style>
