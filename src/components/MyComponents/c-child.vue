<template>
  <div>
    <input type="button" value="子组件触发" @click="target">
    名称：{{name}}, 水平：{{level}}, 年纪：{{age}}
    <br>
    <div>这是个h1标题:{{title}}</div>
    <br>
    <div>{{msg}}</div>
  </div>
</template>

<script>
    export default {
      name: "c-child",
      inheritAttrs: false,  //不在html显示没定义的属性
      props: {
        title: {
          type: [String, Number],
          default: "title001",
        },
        name: {
          type: [String, Number],
          default: "hong",
        },
        level: {
          type: Array,
          default: [3,5],
        },
        age:{
          type: Number,
          default: function () {
            return 20
          }
        },
        msg:String
      },
      data(){
        return {
          texts:'这是子组件的数据，将有子组件操作触发传给父组件',
          text2:"1111"
        }
      },
      methods:{
        target:function(){ //有子组件的事件触发 自定义事件childevent
          this.$emit('childevent',this.texts);//触发一个在子组件中声明的事件 childEvnet
          this.$emit('update:name', "leon");

        }
      },
      mounted:function(){
        console.log("attrs:")
        console.log(this.$attrs); //只要父组件未被定义的属性就会传到$attrs
      }
    }
</script>

<style scoped>

</style>
