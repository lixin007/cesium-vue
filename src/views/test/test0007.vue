<template>
    <div class="a-one">
      <tsg-button type="warning" size="large" value="a80"></tsg-button>
      <tsg-hello  msg="Welcome to zkxt-ui Demo666" />
      <tsg-el-button plain  type="success">信息按钮</tsg-el-button>
    </div>
</template>

<script>
    export default {
        name: "test0007",
      data(){
        return{
          msg:"999"
        }
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

</style>
