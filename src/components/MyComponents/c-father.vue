<template>
  <div>
    <c-child :name="name" :age="age" :level="level" :title="title" :msg="msg"  @childevent='wathChildEvent'></c-child>
  </div>
</template>

<script>
  import cChild from "@/components/MyComponents/c-child.vue"
    export default {
        name: "c-father",
        data(){
          return {
            name: "rick",
            age: 19,
            level:[3,6],
            msg: "noData",
            title:"title001"
          }
        },
        components:{
          "c-child": cChild
        },
        methods:{
          wathChildEvent:function(vals){//直接监听 又子组件触发的事件，参数为子组件的传来的数据
            console.log(vals);//结果：这是子组件的数据，将有子组件操作触发传给父组件
            this.msg = vals;
          }
      }
    }
</script>

<style scoped>

</style>
