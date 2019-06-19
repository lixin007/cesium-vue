<template>
  <div id="cesiumContainer"></div>
</template>

<script>
// 局部组件引用
import Cesium from 'cesium/Cesium'
// noinspection ES6UnusedImports
import widget from 'cesium/Widgets/widgets.css'
import earthShell from 'earthFrame/EarthShell'
export default {
  name: "cesiumContainer",
  mounted() {
    this.$nextTick(() => {
      this.cesiumInit()
    })
  },
  methods: {
    cesiumInit() {
      //let viewer = new Cesium.Viewer('cesiumContainer');
       let viewer = new earthShell('cesiumContainer',{
         showEagleEyeMap: true
       });
    }
  }
}
</script>
