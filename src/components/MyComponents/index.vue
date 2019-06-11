<template>
  <div>
    <h5 class={styles.title}>{{name}}</h5>
    <slot name="header"><h1>默认header</h1></slot>
    <!--<div class="num">{{ count }}</div>-->
    <el-input v-model="count" placeholder="" class="input-margin" v-focus></el-input>
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
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el,binding,vnode) {
          el.style.border="1px solid red";  //操作style所有样式
          // console.log(el);
          // console.log(el.value);
          // console.log(el.dataset.name);
          // console.log("666");
          console.log(vnode.context.$route);
           el.querySelector('input').focus()
        }
      }
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
  .input-margin {
    margin: 5px 0;
  }

</style>

