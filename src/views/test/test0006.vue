<template>
    <div>
      <span v-my-directive="color3">{{message}}</span>
<!--      <my-try colorType="a-danger font-big"/>-->
      <test-toast ref="toast"></test-toast>
      <tsg-button type="danger" ref="a1"  @click.native="aa" value="77"></tsg-button><br>
      <tsg-button type="warning" :value=message></tsg-button><br>
      <tsg-button type="danger" size="large" value="a1"></tsg-button>
      <tsg-input
        placeholder="请输入内容6"
        suffix-icon="el-icon-date"
        style="margin: 5px 0;width:300px;"
        v-model="message">
      </tsg-input>
<!--      {{color3}} <br/> {{message}}<br/> {{a1}}-->

      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-button type="text" @click="dialogVisible2 = true">点击打开 Dialog2</el-button>
      <tsg-dialog
      title="提示1"
      :visible.sync="dialogVisible"
      :drag = true
      width="30%">
      <span>这是一段信息1</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </tsg-dialog>
      <tsg-dialog
        title="提示2"
        :visible.sync="dialogVisible2"
        :drag = true
        width="30%">
        <span>这是一段信息2</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </tsg-dialog>


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
        message:"6000008",
        dialogVisible: false,
        dialogVisible2: false,
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
