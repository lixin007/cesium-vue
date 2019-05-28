<template>
  <div class="main">
    <div id="cesiumContainer">
    </div>
    <div class="toolbar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit" size="mini" plain  title="长度测量" @click="createMeasureEvent('drawLine')"></el-button>
        <el-button type="primary" icon="el-icon-share" size="mini" plain title="面积测算" @click="createMeasureEvent('drawPloy')"></el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini" plain title="清理结果" @click="createMeasureEvent('cleanUp')"></el-button>
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
      MeasureHelper: null,  // 测量工具类
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
    createMeasureEvent: function (type) {
      if (this.MeasureHelper == null)
        this.MeasureHelper = this.earth.MeasureHelper();
        this.MeasureHelper.createMeasureEvent(type);
    },
  }
}
</script>

<style lang="scss" scoped>
  .toolbar {
    position: absolute;
    top: 10px;
    left: 10px;

    .el-button-group {
      .el-button {
        font-size: 1.25rem !important;
        padding: 5px 10px !important;
      }
    }
  }

</style>
