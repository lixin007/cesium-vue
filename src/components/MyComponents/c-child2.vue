<template>
    <div>
      <div>
        <span>{{chuang}}</span>
        <span>{{selectArray}}</span>
        <button @click="change" style="margin-top: 20px;">确定</button>
      </div>
    </div>
</template>

<script>

    export default {
        name: "c-child2",
        data(){
          return {
            chuang:'666777',
            selectArray:""
          }
        },
       methods:{
         change() {

           // PubSub.subscribe('ad', (msg, val) => {
           //   this.selectArray = val
           //
           // })
           //this.chuang ='555'
         }
       },
      mounted(){
        PubSub.subscribe('cg', (msg, val) => { //响应child1
          console.log(msg)
          this.chuang = val
        })
        PubSub.subscribe('ad', (msg, val) => {
          console.log('----')
          console.log(msg)
          this.selectArray = val

        })
      }
    }
</script>

<style scoped>

</style>
