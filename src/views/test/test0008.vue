<template>
    <div style="margin: 5px">
      <el-button  type="info" @click="runPromise" plain style="margin: 5px">单独promise</el-button>
      <el-button  type="info" @click="runPromiseALL" plain style="margin: 5px">多个promise</el-button>
      <el-button  type="info" @click="enumerable" plain style="margin: 5px">对象枚举</el-button>
      <el-button  type="info" @click="forEachJump" plain style="margin: 5px">foreach跳出</el-button>
      路由
      <router-link to="test6">{{this.$route.fullPath}}</router-link>
      <test-eight />
    </div>
</template>

<script>
  function promiseClick(){
    let p = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        let num = Math.ceil(Math.random()*20); //生成1-10的随机数
        console.log('随机数生成的值：',num)
        if(num<=10){
          resolve(num);
        }
        else{
          reject('数字太于10了即将执行失败回调');
        }
      }, 100);
    })
    return p
  }

  const TestEight = ()=>import("@/views/test/test00081")
    export default {
      name: "test0008",
      data(){
        return {

        }
      },
      components:{
        TestEight
      },
      methods: {
        runPromise(){
          promiseClick().then(
           (data)=>{
              console.log('resolved成功回调');
              console.log('成功回调接受的值：',data)
            },
            (reason, data)=>{
              console.log('rejected失败回调');
              console.log('失败执行回调抛出失败原因：',reason)
            }
          )
        },
        runPromiseALL(){
           this.$router.push({  path: 'test6' ,query: { type: '2'} })
          // return
          let a1 =  promiseClick()
          let a2 = promiseClick()
          Promise.all([a1, a2]).then((results)=>{
              console.log(results)
            }).catch(function(reason, data){
            console.log('catch到rejected失败回调')
            console.log('catch失败执行回调抛出失败原因：',reason)
          });
        },

        enumerable(){ //是否对象可以枚举
          let o = {
            "name":"tom",
            "age": 33,
          }; // 创建一个新对象
          Object.defineProperty(o, "a", { //定义属性
            value : 37,
            writable : true,
            enumerable : false,//此处设置为false， 在枚举的时候会忽略
            configurable : true
          });
          Object.setPrototypeOf(o,{ //增加属性
            saraly:"100000"
          })
          for(let i in o){
            console.log(o[i]); // undefined, 是没有具体的值的.
          }
          console.log(Object.getOwnPropertyDescriptor(o, 'a')) //获取对对象属性的描述对象
        },

        forEachJump(){
          const a1 = [1,2,3,4,5,6]
          try{
            a1.forEach((item) =>{
              if (item == 3) {
                throw new Error("ending")
              } else {
                console.log(item)
              }
            })
          }catch(e){}
        },

      },
      mounted () {

      }
    }
</script>

<style scoped>

</style>
