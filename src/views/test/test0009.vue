<template>
  <div id="app">
    <div ref="testDom" style="margin: 10px">
      <div>{{testDomValue}}</div>
    </div>
    <el-button @click="showRef" ref="refButton" v-btype>getRef</el-button>
    <el-button @click="showData">getRefText</el-button>
    <el-button @click="showNProgress">显示顶部进度条</el-button>
    <el-button @click="showElNProgress">显示进度条</el-button>
    <el-button @click="showRoute">显示路由</el-button>
    <el-button @click="showPromise">显示promise</el-button>
    <router-link  to="test8/test82">路由链接</router-link><br/>
    <div @click="refreshCode">
      <s-identify :identifyCode="identifyCode"></s-identify>
    </div>

    <el-progress :percentage="percentage" :color="customColor" text-inside="true" :stroke-width="20" width="100" style="margin: 10px 100px" v-if="progressELState"></el-progress>
  </div>
</template>

<script>
  import NProgress from 'nprogress' // progress bar
  import 'nprogress/nprogress.css' // progress bar style
  import SIdentify from '@/components/identify'
  import router from '@/router'
  import MyComponents from "@/components/MyComponents/index.vue"
    export default {
      name: "test0009",
      data(){
        return {
          identifyCodes: '1234567890',
          identifyCode: '',
          testDomValue:"666",
          customColor: '#409eff',
          percentage: 0,
          progressState: false,
          progressELState:false,
        }
      },
      methods: {
        showRef() {
          // console.log(this.$refs.testDom)
        },
        showData(){
          console.log(this.$data.testDomValue)
          console.log(this.testDomValue)
          // console.log(this.$options.methods.showData) //获取方法
        },
        showNProgress(){
          this.progressState = !this.progressState
          this.progressState? NProgress.start(): NProgress.done()
        },
        showElNProgress(){
          this.progressELState = true
          this.percentage = 0
          let eLStateInterval
           eLStateInterval = setInterval(()=>{
              const randDomNun = Math.floor(Math.random()*50+1) //1至50的随机数
              this.percentage += randDomNun
              if (this.percentage > 100) {
                clearInterval()
                this.progressELState = false
              }
            },1000)
        },
        showRoute(){
          let newRoutes = _.remove(router.options.routes, function(item) {
            return item.name !=='test'
          })
          // router.options.routes = newRoutes
          // router.addRoutes(newRoutes)
          this.$router.options.routes = newRoutes
          this.$router.addRoutes(newRoutes)
          this.$router.push({ path: '/example/table' })
          // router.push({ path: '/example/table' })

        },
        showPromise(){
          const setPromise=()=>{
            return new Promise((resolve, reject)=>{
              //一般可以在这套上读取接口的代码
              return resolve("OK")
            })
          }
          setPromise().then(data => {
            alert(data)
          })
        },


        // 验证码相关(开始)
        // 生成随机数
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min)
        },
        // 切换验证码
        refreshCode() {
          this.identifyCode = ''
          this.makeCode(this.identifyCodes, 4)
        },
        // 生成四位随机验证码
        makeCode(o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
              this.randomNum(0, this.identifyCodes.length)
              ]
          }
          console.log(this.identifyCode)
        }
        // 验证码相关(结束)

      },
      mounted() {
        // 验证码初始化
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      directives: {
        btype:{
          update: function (el,binding,vnode) {
            debugger
            console.log(el)
          }
        }
      },
      components:{
        SIdentify,
        "my-components":MyComponents
      },
    }
</script>

<style scoped>

</style>
