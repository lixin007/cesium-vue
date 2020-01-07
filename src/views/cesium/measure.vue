<template>
  <div class="main">
    <div id="cesiumContainer">
    </div>
    <div class="toolbar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-ump-huizhi" size="mini" plain  title="长度测量" @click="createMeasureEvent('drawLine')"></el-button>
        <el-button type="primary" icon="el-icon-ump-draw-polygon" size="mini" plain title="面积测算" @click="createMeasureEvent('drawPloy')"></el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini" plain title="清理结果" @click="createMeasureEvent('cleanUp')"></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import Cesium from 'cesium/Cesium'
import earthShell from 'earthFrame/EarthShell'
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
      this.createCzm()
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
    createCzm: function () {
      let viewer = globalThis.viewer;

      const a1 = {
        "name": "ss1",
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  90.3515625,
                  69.77895177646761
                ],
                [
                  60.46875,
                  48.69096039092549
                ],
                [
                  34.1015625,
                  53.330872983017066
                ]
              ]
            }
          }
        ]
      }
      viewer.dataSources.add(Cesium.GeoJsonDataSource.load(a1,{
        sourceUri:"ss1",
        stroke: Cesium.Color.RED,
        strokeWidth: 10,
        markerSymbol: '?'
      }));
      const a2 = {
        "name": "ss2",
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  90.3515625,
                  69.77895177646761
                ],
                [
                  60.46875,
                  48.69096039092549
                ],
                [
                  34.1015625,
                  53.330872983017066
                ]
              ]
            }
          }
        ]
      }

      const promise= viewer.dataSources.add(Cesium.GeoJsonDataSource.load(a2,{
        sourceUri:"ss2",
        stroke: Cesium.Color.BLUE,
        strokeWidth: 10,
        markerSymbol: '?'
      }));
      promise.then(function(dataSource) {
        for (let i = 0; i < viewer.dataSources._dataSources.length; i++) {
          if ( viewer.dataSources._dataSources[i].name =="ss2") {
            let entities = viewer.dataSources._dataSources[i].entities.values
            console.log(viewer.dataSources._dataSources[i].entities.values)
            for (let i2 = 0; i2 < entities.length; i2++) {
              const entity = entities[i2]
              entity.polyline.zIndex = 10
              // entity.polyline.width = 100
              entity.polyline.clampToGround = true
            }
          } else {
            let entities = viewer.dataSources._dataSources[i].entities.values
            // console.log(viewer.dataSources._dataSources[i].entities.values)
            for (let i2 = 0; i2 < entities.length; i2++) {
              const entity = entities[i2]
              entity.polyline.zIndex = 5
              entity.polyline.clampToGround = true
            }
          }
        }
        for (let i = 0; i < viewer.dataSources._dataSources.length; i++) {
          let entities = viewer.dataSources._dataSources[i].entities.values
          for (let i2 = 0; i2 < entities.length; i2++) {
            const entity = entities[i2]
            console.log(entity.polyline.zIndex)
          }
        }
      });

      viewer.flyTo(promise);
    }
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

    /*.el-button--primary.is-plain {
      color: #22abff;
      background: #1f2d3d;
    }*/
  }

</style>
