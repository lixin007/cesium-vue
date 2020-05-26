<template>
  <div>
    <h5 class={styles.title}>{{name}}</h5>
    <slot name="header"><h1>默认header</h1></slot>
    <!--<div class="num">{{ count }}</div>-->
    <el-input v-model="count" placeholder="" class="input-margin" v-focus="count"></el-input>
    <el-input v-model="count2" placeholder="" class="input-margin"></el-input>
    <el-input v-model="count3" placeholder="" class="input-margin"></el-input>
    <el-input v-model="count4" placeholder="" class="input-margin"></el-input>
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
        update: function (el,binding,vnode) {

          // el.style.border="1px solid red";  //操作style所有样式
          // el.input.style.color="1px solid red";  //操作style所有样式
          console.log(binding.value);
          const value = binding.value
          if (value =="good") {
            el.style.border="1px solid green";
            el.querySelector('input').style.color='green'
          }  else {
            el.style.border="1px solid red";
            el.querySelector('input').style.color='red'
          }
          console.log(el);
          console.log(vnode);
          el.querySelector('input').focus()
        }
      }
    },
    data() {
      return {
        count: 90,
        count2: 290,
        count3: 390,
        count4: 490,
      };
    },
    methods: {
      increment() {
        this.count++;
        // this.$router.push({path:'/polygon'})
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

