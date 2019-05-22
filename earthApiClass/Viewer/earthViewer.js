/**
 * Created by Administrator on 2019/2/18.
 */
import Cesium from 'cesium/Cesium';
import earthCommon from '../Common/earthCommon';
import 'jquery';
import DrawHelper from './DrawHelper';
import MeasureHelper from './MeasureHelper';
import SearchHelper from './SearchHelper';
import TilesHelper from './TilesHelper';
import WeatherSimulation from './WeatherSimulation';
import ImageryProvider from './ImageryProvider';
import widgets from 'cesium/Widgets/widgets.css';
import earthCss from '../css/earthApi.css';
import ParticleSystem from "./ParticleSystem";
export default class earthViewer {
  constructor(element, options) {
    /**
     * 初始化球相关操作
     * @type {{baseUrl: string, imgUrl: string, initPoi: {lat: number, lng: number, stadia: number}, imageryProvider: (*)}}
     */
    let defaultOptions = {
      baseUrl: 'http://172.16.5.93:8088/webearth',     // 插件网络请求基础地址(默认)
      // baseUrl: 'http://183.232.33.177:9080/webearth',     // 插件网络请求基础地址(默认)
      imgUrl: '../img/',
      initPoi: {lat: 105, lng: 33, stadia: 25000000},
      imageryProvider: new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}"})
    };
    const _this = this;
    if (options)
      options = earthCommon.copyOptions(options, defaultOptions);
    else
      options = defaultOptions;
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTgyNDg3My04NTA5LTQ4ZmEtOTMyNS1mMTUzZDdlOTk1ZWMiLCJpZCI6NDcxMSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MTQ2ODc1MH0.dhnEDkhy9hUegKNRdQZJ6D0GBC_aOGHZDj_wS8TWYVg"
    // let terrainProvider = new Cesium.CesiumTerrainProvider({
    //   // url: "http://120.197.252.52:8877/MainProcess.ashx?row=1&column=1&zoom=1&type=0&.tif"
    //   url : 'https://assets02.agi.com/stk-terrain/world',
    //   requestVertexNormals: true
    // });
    _this.viewer = new Cesium.Viewer(element, {
      geocoder: false,
      homeButton: true,
      sceneModePicker: true,
      fullscreenButton: false,
      vrButton: false,
      baseLayerPicker: false,
      shouldAnimate : true,
      terrainProvider: Cesium.createWorldTerrain(),
      animation: false,
      infoBox: false,
      selectionIndicator: false,
      timeline: false,
      // sceneMode: Cesium.SceneMode.SCENE2D,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      mapProjection: new Cesium.WebMercatorProjection(),
      imageryProvider: options.imageryProvider
    })

    // 重置Cesium自带homeButton事件
    _this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function () {
      Cesium.requestAnimationFrame(function () {
        _this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(options.initPoi.lat, options.initPoi.lng, options.initPoi.stadia)
        })
      })
    })

    // 初始化视角
    _this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(options.initPoi.lat, options.initPoi.lng, options.initPoi.stadia),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
        roll: Cesium.Math.toRadians(0)
      }
    })

    // 添加水效果
    // _this.viewer.terrainProvider = Cesium.createWorldTerrain({
    //   requestWaterMask : false
    // });

    // 屏蔽地表大气效果
    _this.viewer.scene.globe.showGroundAtmosphere = false;

    // 加载中国行政区划（临时）
    // _this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    //   url : 'http://172.16.5.30:8080/geoserver/sde/wms',
    //   layers : 'sde:BOULN000000',
    //   parameters: {
    //     service: 'WMS',
    //     version: '1.1.0',
    //     format: 'image/png',
    //     transparent: true
    //   }
    // }));

    /**
     * 加载geoJson点击改变颜色
     * @type {Promise.<GeoJsonDataSource>}
     */
    // let promise = Cesium.GeoJsonDataSource.load('../../../static/ne_10m_us_states.topojson', {
    //   stroke: Cesium.Color.WHITE,
    //   fill: Cesium.Color.YELLOW,
    //   strokeWidth: 50,
    //   markerSymbol: '?'
    // });
    // promise.then(function (dataSource) {
    //   _this.viewer.dataSources.add(dataSource)
    //   _this.entities = dataSource.entities.values;
    //   console.log(dataSource.entities.values)
    //   var pickedObjects = _this.scene.drillPick(movement.position, 2);
    //   console.log(pickedObjects);
    // })
    // _this.viewer.flyTo(_this.viewer.dataSources.add(promise));
    // _this.viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
    //   // If a feature was previously highlighted, undo the highlight
    //   var pickedFeature = _this.viewer.scene.pick(movement.position);
    //   if (!Cesium.defined(pickedFeature)) {
    //     return;
    //   }
    //   console.log(pickedFeature);
    //   for (let i = 0; i < _this.entities.length; i++) {
    //     var entity = _this.entities[i];
    //     if (entity.id == pickedFeature.id._id) {
    //       console.log(entity)
    //       entity.polygon.material = Cesium.Color.fromRandom({
    //         alpha: 0.6
    //       });
    //     }
    //   }
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }


  /**
   * 初始化标绘工具类，返回一个标绘工具类earthDrawHelper实例对象
   * @returns {earthDrawHelper}
   */
  DrawHelper(options) {
    return new DrawHelper(this.viewer, options);
  }

  /**
   *  初始化测量工具类，返回一个测量工具类earthMeasureHelper实例对象
   * @returns {earthMeasureHelper}
   */
  MeasureHelper(options) {
    return new MeasureHelper(this.viewer, options);
  }

  /**
   *  初始化搜索工具类，返回一个测量工具类SearchHelper实例对象
   * @returns {SearchHelper}
   */
  SearchHelper(options) {
    return new SearchHelper(this.viewer, options);
  }

  TilesHelper(options) {
    return new TilesHelper(this.viewer, options);
  }

  WeatherSimulation(options) {
    return new WeatherSimulation(this.viewer, options);
  }

  ImageryProvider(options) {
    return new ImageryProvider(this.viewer, options);
  }

  ParticleSystem(options) {
    return new ParticleSystem(this.viewer, options);
  }
}
