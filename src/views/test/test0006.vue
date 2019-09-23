<template>
    <div>
      <span v-aa1>{{message}}</span>
<!--      <my-try colorType="a-danger font-big"/>-->
      <test-toast ref="toast"></test-toast>
      <jed-button type="danger">hansu</jed-button><br>
      <jed-button type="warning">hansu</jed-button><br>
      <jed-button type="danger" size="large">hansu</jed-button>
    </div>
</template>

<script>
  import Vue from 'vue'
  import MyPlugin from '@/utils/plugin'
  Vue.use(MyPlugin)
  import { mixin } from '@/utils/mixin'
  // Vue.mixin(mixin)
  export default {
    name: "test0006",
    mixins: [mixin],
    data () {
      return {
        message:6000000,
        color3:"red"
      }
    },
    mounted() {
      this.$myMethod();
      Vue.myGlobalMethod();
      this.formatDate("56")
      // tsg.npmTest("84710")
      // tsg.yz()
      // const { yz2,yz4 } = tsg
      // console.log(yz2)
      // const person = new yz4('leon',30)
      // console.log(person.say())
    }
  }
</script>

<style scoped>

</style>
