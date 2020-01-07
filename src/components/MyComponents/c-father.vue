<template>
  <div>
    <c-child :name.sync="name" :level="level" :title="title" :msg="msg"  @childevent='wathChildEvent' tsg="1899"></c-child>
    <c-child2/>
    <button @click="change" style="margin-top: 20px;">改变</button>
  </div>
</template>

<script>
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
          "c-child": () => import('@/components/MyComponents/c-child.vue'),
          "c-child2": () => import('@/components/MyComponents/c-child2.vue')
        },
        methods:{
          wathChildEvent:function(vals){//直接监听 又子组件触发的事件，参数为子组件的传来的数据
            console.log("vals:")
            console.log(vals);//结果：这是子组件的数据，将有子组件操作触发传给父组件
            this.msg = vals;
          },
          change() {
            this.name = '123';
          }
      }
    }
</script>

<style scoped>

</style>
