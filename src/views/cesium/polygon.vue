<template>
  <div class="main">
    <div id="cesiumContainer">
    </div>
    <div class="toolbar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-ump-huizhi" size="mini" plain  title="长度测量" @click="a1"></el-button>
        <el-button type="primary" icon="el-icon-ump-draw-polygon" size="mini" plain title="面积测算" @click="a2"></el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini" plain title="清理结果" @click="createMeasureEvent('cleanUp')"></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import Cesium from 'cesium/Cesium'
  import earthShell from 'earthFrame/EarthShell'
  let viewer
  export default {
    name: "polygon",
    data() {
      return {
        earth: null,
        MeasureHelper: null,  // 测量工具类
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.cesiumInit()
        this.createCzm(viewer)
      })
    },
    methods: {
      cesiumInit() { //cesium初始化
        let options = {
          token: 'abcdefghijklnmopqrstuvwxyz123456',
          // baseUrl: 'http://183.232.33.177:9080/webearth',
          baseUrl: 'http://172.16.5.91:8088/webearth',
          imgUrl: '../img/',
          initPoi: {lat: 105, lng: 33, stadia: 25000000},
          imageryProvider: new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}"}),
          showEagleEyeMap: true,
          navigation: {
            // 是否显示罗盘
            show: true,
            // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
            defaultResetView: Cesium.Rectangle.fromDegrees(80, 22, 130, 50),
            // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
            enableCompass: true,
            // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
            enableZoomControls: true,
            // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
            enableDistanceLegend: true,
            // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
            enableCompassOuterRing: false
          },
          showCloud: false   // 是否启用云层显示。true是启用，false是禁用。默认值为false
        };
        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTgyNDg3My04NTA5LTQ4ZmEtOTMyNS1mMTUzZDdlOTk1ZWMiLCJpZCI6NDcxMSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MTQ2ODc1MH0.dhnEDkhy9hUegKNRdQZJ6D0GBC_aOGHZDj_wS8TWYVg"
         viewer = new Cesium.Viewer('cesiumContainer', {
          geocoder: false,
          homeButton: true,
          sceneModePicker: true,
          fullscreenButton: false,
          vrButton: false,
          baseLayerPicker: false,
          shouldAnimate : true,
          // terrainProvider: Cesium.createWorldTerrain(),//terrainProvider,
          animation: false,
          infoBox: false,
          selectionIndicator: false,
          timeline: false,
          // sceneMode: Cesium.SceneMode.SCENE2D,
          CreditsDisplay: false,
          navigationHelpButton: false,
          navigationInstructionsInitiallyVisible: false,
          mapProjection: new Cesium.WebMercatorProjection(),
          imageryProvider: options.imageryProvider
        });

        // 初始化视角
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(options.initPoi.lat, options.initPoi.lng, options.initPoi.stadia),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: Cesium.Math.toRadians(0)
          }
        })
        return viewer
      },
      createMeasureEvent: function (type) {
        if (this.MeasureHelper == null)
          this.MeasureHelper = this.earth.MeasureHelper();
        this.MeasureHelper.createMeasureEvent(type);
      },
      createCzm: function (viewer) {
        const wyoming =viewer.entities.add({
          id : 'w1',
          name : 'Wyoming1',
          polygon : {
            hierarchy : Cesium.Cartesian3.fromDegreesArray([
              -109.080842,45.002073,
              -105.91517,45.002073,
              -104.058488,44.996596,
              -104.053011,43.002989,
              -104.053011,41.003906,
              -105.728954,40.998429,
              -107.919731,41.003906,
              -109.04798,40.998429,
              -111.047063,40.998429,
              -111.047063,42.000709,
              -111.047063,44.476286,
              -111.05254,45.002073]),
            material : Cesium.Color.RED.withAlpha(1),
            outline : true,
            zIndex: 2,
            outlineColor : Cesium.Color.BLACK
          }
        });

        const wyoming2 =viewer.entities.add({
          id : 'w2',
          name : 'Wyoming2',
          polygon : {
            hierarchy : Cesium.Cartesian3.fromDegreesArray([
              -109.080842,45.002073,
              -105.91517,45.002073,
              -104.058488,44.996596,
              -104.053011,43.002989,
              -104.053011,41.003906,
              -105.728954,40.998429,
              -107.919731,41.003906,
              -109.04798,40.998429,
              -111.047063,40.998429,
              -111.047063,42.000709,
              -111.047063,44.476286,
              -111.05254,45.002073]),
            material : Cesium.Color.BLUE.withAlpha(1),
            outline : true,
            zIndex: 1,
            outlineColor : Cesium.Color.BLACK
          }
        });
        viewer.zoomTo(wyoming);

      },
      a1(){
        let  w1 = viewer.entities.getById('w1').polygon
        let  w2 = viewer.entities.getById('w2').polygon
        console.log(w1)
        if (w1.zIndex > w2.zIndex) {
          w2.zIndex  = w1.zIndex +1
        } else
        {
          w1.zIndex  = w2.zIndex +1
        }
      },
      a2(){
        debugger
        for (let i = 0; i < viewer.dataSources._dataSources.length; i++) {
          let entities = viewer.dataSources._dataSources[i].entities.values
          for (let i2 = 0; i2 < entities.length; i2++) {
            const entity = entities[i2]
            console.log(entity.polyline.zIndex)
          }
        }
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
