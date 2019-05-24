<template>
  <div>
    <h5 class={styles.title}>{{name}}</h5>
    <div class="num">{{ count }}</div>
    <el-button  @click="increment">自增</el-button>
  </div>
</template>

<script>
  import styles from "@/styles/mycompoents.scss"
  export default {
    name: 'test',
    props: {
      name: String,
      default: ''
    },
    data() {
      return {
        count: 0
      };
    },
    methods: {
      increment() {
        this.count++;
      }
    }
  };
</script>

<style lang="scss" scoped>
  $color1:blue;
  $color2:green;
  .title{
    font-size: 24px;
    color: $color1;
  }
  .num {
    font-size: 20px;
    color: $color2;
  }

</style>

