<template>
  <div class="main">
    <div id="cesiumContainer">
    </div>
    <div class="toolbar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-ump-Pointer2" size="mini" plain  title="点" @click="createDrawEvent('marker')"></el-button>
        <el-button type="primary" icon="el-icon-ump-edit-line" size="mini" plain title="线" @click="createDrawEvent('polyline')"></el-button>
        <el-button type="primary" icon="el-icon-ump-huizhiduobianxing" size="mini" plain title="面" @click="createDrawEvent('polygon')"></el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini" plain title="清理标绘" @click="createDrawEvent('cleanUp')"></el-button>
        <el-button type="primary" icon="el-icon-download" size="mini" plain title="导出标绘" @click="exportDrawResult()"></el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini" plain title="导入图层" @click="importShapFile()"></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import earthShell from 'earthApiClass/EarthShell'
  export default {
    name: "cesiumContainer",
    data() {
      return {
        earth: null,
        DrawHelper: null,  // 测量工具类
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.cesiumInit()
      })
    },
    methods: {
      cesiumInit() { //cesium初始化
        let _this = this;
        _this.earth = new earthShell('cesiumContainer',{
          showEagleEyeMap: true,
          initPoi: {lat: 113.2759952545166, lng: 23.117055306224895, stadia: 50000}
        });
      },
      createDrawEvent: function (type) {
        console.log(type);
        if (this.DrawHelper == null)
          this.DrawHelper = this.earth.DrawHelper({
            token: 'abcdefghijklnmopqrstuvwxyz123456',
            baseUrl: 'http://183.232.33.177:9080/webearth'
          });
        this.DrawHelper.registerDrawEvent(type, function () {
        });
      },
      //导出标绘
      exportDrawResult: function () {
        this.DrawHelper.exportDrawResult('saveLayer', function () {

        });
      },
      //导入图层
      importShapFile: function () {
        this.DrawHelper.importShapFile();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .toolbar {
    position: absolute;
    top: 10px;
    left: 10px;
    /*width: 75px;*/

    .el-button-group {
      .el-button {
        font-size: 1.25rem !important;
        padding: 5px 10px !important;
      }
    }
  }

</style>
