<template>
  <div class="main">
    <div class="toolbar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-top" size="mini" plain title="最上" @click="lowerToBottom"></el-button>
        <el-button type="primary" icon="el-icon-top-left" size="mini" plain title="向上" @click="lower"></el-button>
        <el-button type="primary" icon="el-icon-bottom-right" size="mini" plain  title="向下" @click="raise"></el-button>
        <el-button type="primary" icon="el-icon-bottom" size="mini" plain title="最底"  @click="raiseToTop"></el-button>
      </el-button-group>
    </div>
    <div id="cesiumContainer">
    </div>
  </div>
</template>

<script>
  import Cesium from 'cesium/Cesium'
  import earthShell from 'earthFrame/EarthShell'
  let viewer
  export default {
    name: "polygon2",
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

      createCzm: function (viewer) {
        const a1 = {
          "id":"w1",
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [
                      48.8671875,
                      68.39918004344189
                    ],
                    [
                      -29.53125,
                      37.43997405227057
                    ],
                    [
                      17.2265625,
                      -2.460181181020993
                    ],
                    [
                      48.8671875,
                      68.39918004344189
                    ]
                  ]
                ]
              }
            }
          ]
        }
        const a2 = {
          "id":"w2",
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [
                      48.8671875,
                      68.39918004344189
                    ],
                    [
                      -29.53125,
                      37.43997405227057
                    ],
                    [
                      17.2265625,
                      -2.460181181020993
                    ],
                    [
                      48.8671875,
                      68.39918004344189
                    ]
                  ]
                ]
              }
            }
          ]
        }

        viewer.dataSources.add(Cesium.GeoJsonDataSource.load(a1,{
          sourceUri:"ss1",
          strokeWidth: 10,
          stroke: Cesium.Color.BLUE,
          fill: Cesium.Color.BLUE,
          markerSymbol: '?'
        }));
        viewer.dataSources.add(Cesium.GeoJsonDataSource.load(a1,{
          sourceUri:"ss2",
          strokeWidth: 10,
          stroke: Cesium.Color.RED,
          fill: Cesium.Color.RED,
          markerSymbol: '?'
        }));
        viewer.dataSources.add(Cesium.GeoJsonDataSource.load(a1,{
          sourceUri:"ss3",
          strokeWidth: 10,
          stroke: Cesium.Color.GREEN,
          fill: Cesium.Color.GREEN,
          markerSymbol: '?'
        }));

        // let  w1 = viewer.dataSources.get(0)
        // viewer.dataSources.raiseToTop(w1)
        // console.log(viewer.entities)
        for (let i = 0; i < viewer.dataSources._dataSources.length; i++) {
          // let entities = viewer.dataSources._dataSources[i].entities.values
          let entities = viewer.dataSources._dataSources[i].entities
          // console.log(viewer.dataSources)
          // console.log(viewer.dataSources._dataSources)
          // console.log(viewer.dataSources._dataSources[0].entities)
          // console.log(viewer.dataSources._dataSources[0].entities.values)
        }
      },
      raise(){
        let i = viewer.dataSources._dataSources.findIndex((obj) => obj.name == "ss2")
        let  w1 = viewer.dataSources._dataSources[i]
         viewer.dataSources.raise(w1)
         this.showLayer()
      },
      raiseToTop(){
        let i = viewer.dataSources._dataSources.findIndex((obj) => obj.name == "ss2")
        let  w1 = viewer.dataSources._dataSources[i]
        viewer.dataSources.raiseToTop(w1)
        this.showLayer()
      },
      lower(){
        let i = viewer.dataSources._dataSources.findIndex((obj) => obj.name == "ss2")
        let  w1 = viewer.dataSources._dataSources[i]
        viewer.dataSources.lower(w1)
        this.showLayer()
      },
      lowerToBottom(){
        let i = viewer.dataSources._dataSources.findIndex((obj) => obj.name == "ss2")
        let  w1 = viewer.dataSources._dataSources[i]
        console.log(w1)
        viewer.dataSources.lowerToBottom(w1)
        this.showLayer()
      },
      showLayer(){
        console.log(viewer.dataSources._dataSources)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toolbar {
    position: absolute;
    top: 65px;
    left: 10px;
    z-index: 999;

    .el-button-group {
      .el-button {
        font-size: 1.25rem !important;
        padding: 5px 10px !important;
      }
    }

  }

</style>
