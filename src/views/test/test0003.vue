<template>
  <div>
    <c-father></c-father>
    <test-panel ref="panel"></test-panel>
    <test-toast ref="toast"></test-toast>
  </div>
</template>

<script>
  import cFather from "@/components/MyComponents/c-father.vue"
  import {Point} from "@/utils/myutils"
  export default {
    name: "test0003",
    data(){
      return{
        testArr:[1,2,5]
      }
    },
    created(){
      console.log(this.$msg);
      console.log(this.$myMethod(this.testArr));
      this.$nextTick(() =>{
        console.log(this.$refs.panel.$el);
      })
    },
    mounted() {
      const p = new Point(1,2);
      p.y = 3
      p.showValue()
      p.showC()
    },
    components: {
      "c-father": cFather
    },
  }
</script>

<style scoped>

</style>
