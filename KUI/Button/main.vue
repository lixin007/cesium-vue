<template>
    <div class="kui-button">
      <el-button  v-bind="{...$props, ...$attrs}" v-on="$listeners" type="success">{{text}}</el-button>
    </div>
</template>

<script>
    export default {
      name: "kuiButton",
      props: {
        text: {
          type: String,
          required: true,
          default: ''
        },
        color: {
          type: String,
          required: false,
          default: ''
        },
      }
    }
</script>

<style lang="scss" scoped>
  /deep/{
    .el-button {
      background-color: #003a00 !important;
    }
  }
</style>
