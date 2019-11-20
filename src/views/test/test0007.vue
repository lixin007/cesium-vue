<template>
    <div class="a-one">
      <div class="a-two">007</div>
      <tsg-button type="danger" size="large" value="a1"></tsg-button>
      <tsg-hello :msg="msg"/>
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
    width: 50vw;
    height: 10vh;
    color: red;
    overflow: hidden;
    .a-two {
      font-size: 0.875em;
    }
  }

</style>
