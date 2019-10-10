<template>
    <div>
      <span v-my-directive="color3">{{message}}</span>
<!--      <my-try colorType="a-danger font-big"/>-->
      <test-toast ref="toast"></test-toast>
      <tsg-button type="danger" ref="a1"  @click.native="aa" value="77"></tsg-button><br>
      <rsg-button type="warning" :value=message></rsg-button><br>
      <tsg-button type="danger" size="large" value="a1"></tsg-button>
      {{color3}} <br/> {{message}}<br/> {{a1}}
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
        message:"6000000",
        color3:"red"
      }
    },
    methods: {
      aa() { //合并数组对象
        // this.color3 ="blue"
        // alert(this.color3)
        const a = [{id:1,age:10},{id:2,age:20},{id:3,age:30}]
        const b = [{id:3,sex:'男'},{id:1,sex:'男'},{id:2,sex:'女'}]
        let c = [];
        for(let u of a) {
          const temp = b.filter(i => i.id === u.id)[0];
          c.push({...u, ...temp});
        }
        console.log(c)
      },
      aa2(){
        alert("update")
      }
    },
    /*updated(){
      debugger
      this.aa2()
    },*/

    mounted() {
      this.$myMethod();

      Vue.myGlobalMethod();
      // this.formatDate("56")
      console.log(this.$refs)
      // tsg.npmTest("84710")
      // tsg.yz()
      // const { yz2,yz4 } = tsg
      // console.log(yz2)
      // const person = new yz4('leon',30)
      // console.log(person.say())
    },
    computed: {
      a1:function(){
        return this.color3+"好"
      },

    }
  }
</script>

<style scoped>

</style>
