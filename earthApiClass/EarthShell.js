/**
 * Created by Administrator on 2019/5/15.
 */
import Cesium from 'cesium/Cesium';
import earthCommon from './Common/earthCommon';
import 'jquery';
import DrawHelper from './Viewer/DrawHelper';
import MeasureHelper from './Viewer/MeasureHelper';
import SearchHelper from './Viewer/SearchHelper';
import TilesHelper from './Viewer/TilesHelper';
import WeatherSimulation from './Viewer/WeatherSimulation';
import ImageryProvider from './Viewer/ImageryProvider';
import ParticleSystem from './Viewer/ParticleSystem';
import EarthConfig from './Viewer/EarthConfig/EarthConfig';
import widgets from 'cesium/Widgets/widgets.css';
import earthCss from './css/earthApi.css';

let _viewer = null;
let _viewer2D = null;
let _worldPosition;
let _distance;
let _element;
export default class EarthShell {
  constructor(element, options) {
    _element = element;
    let defaultOptions = {
      token: 'abcdefghijklnmopqrstuvwxyz123456',
      baseUrl: 'http://183.232.33.177:9080/webearth',
      imgUrl: '../img/',
      initPoi: {lat: 105, lng: 33, stadia: 25000000},
      imageryProvider: new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=s@198&gl=en&x={x}&y={y}&z={z}"}),
      showEagleEyeMap: true
    };
    if (options)
      options = earthCommon.copyOptions(options, defaultOptions);
    else
      options = defaultOptions;
    // let terrainProvider = new Cesium.CesiumTerrainProvider({
    //     // url: "http://120.197.252.52:8877/MainProcess.ashx?row=1&column=1&zoom=1&type=0&.tif"
    //     url : 'http://183.232.33.177:9080/webearth/tiles/gddem',
    //     requestVertexNormals: true
    //   });
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTgyNDg3My04NTA5LTQ4ZmEtOTMyNS1mMTUzZDdlOTk1ZWMiLCJpZCI6NDcxMSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MTQ2ODc1MH0.dhnEDkhy9hUegKNRdQZJ6D0GBC_aOGHZDj_wS8TWYVg"
    _viewer = new Cesium.Viewer(element, {
      geocoder: false,
      homeButton: true,
      sceneModePicker: true,
      fullscreenButton: false,
      vrButton: false,
      baseLayerPicker: false,
      shouldAnimate : true,
      // terrainProvider: terrainProvider,//Cesium.createWorldTerrain(),
      animation: false,
      infoBox: false,
      selectionIndicator: false,
      timeline: false,
      // sceneMode: Cesium.SceneMode.SCENE2D,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      mapProjection: new Cesium.WebMercatorProjection(),
      imageryProvider: options.imageryProvider
    });

    _viewer.camera.changed.addEventListener(sync2DView);

    // 重置Cesium自带homeButton事件
    _viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function () {
      Cesium.requestAnimationFrame(function () {
        _viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(options.initPoi.lat, options.initPoi.lng, options.initPoi.stadia)
        })
      })
    })

    // 初始化视角
    _viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(options.initPoi.lat, options.initPoi.lng, options.initPoi.stadia),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
        roll: Cesium.Math.toRadians(0)
      }
    })

    // 添加水效果
    // _viewer.terrainProvider = Cesium.createWorldTerrain({
    //   requestWaterMask : false
    // });

    // 屏蔽地表大气效果
    // _viewer.scene.globe.showGroundAtmosphere = true;

    // 加载中国行政区划（临时）
    // _viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
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
    //   _viewer.dataSources.add(dataSource)
    //   _this.entities = dataSource.entities.values;
    //   console.log(dataSource.entities.values)
    //   var pickedObjects = _this.scene.drillPick(movement.position, 2);
    //   console.log(pickedObjects);
    // })
    // _viewer.flyTo(_viewer.dataSources.add(promise));
    // _viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
    //   // If a feature was previously highlighted, undo the highlight
    //   var pickedFeature = _viewer.scene.pick(movement.position);
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

    if (options && options.showEagleEyeMap)
      createEagleEyeMap(options);
    loadClusterPoints();
  }
  /**
   * 初始化标绘工具类，返回一个标绘工具类earthDrawHelper实例对象
   * @returns {DrawHelper}
   */
  DrawHelper(options) {
    console.log(options)
    return new DrawHelper(_viewer, options);
  }

  /**
   *  初始化测量工具类，返回一个测量工具类earthMeasureHelper实例对象
   * @returns {MeasureHelper}
   */
  MeasureHelper(options) {
    return new MeasureHelper(_viewer, options);
  }

  /**
   *  初始化搜索工具类，返回一个测量工具类SearchHelper实例对象
   * @returns {SearchHelper}
   */
  SearchHelper(options) {
    return new SearchHelper(_viewer, options);
  }


  TilesHelper(options) {
    return new TilesHelper(_viewer, options);
  }
  /**
   *  初始化天气模拟
器类，返回一个天气模拟器WeatherSimulation实例对象
   * @param options
   * @returns {WeatherSimulation}
   * @constructor
   */
  WeatherSimulation(options) {
    return new WeatherSimulation(_viewer, options);
  }

  /**
   * 初始化基础图层管理类，返回一个基础图层管理类ImageryProvider实例对象
   * @param options
   * @returns {ImageryProvider}
   * @constructor
   */
  ImageryProvider(options) {
    return new ImageryProvider(_viewer, _viewer2D, options);
  }

  ParticleSystem(options) {
    return new ParticleSystem(_viewer, options);
  }

  EarthConfig(options) {
    return new EarthConfig(_viewer, options);
  }
}

/**
 * 创建鹰眼图
 * @param options 部分参数，如地图底图跟3D球一样，但是部分参数不能直接沿用
 */
function createEagleEyeMap(options) {
  // 动态创建鹰眼图容器
  let div = document.createElement("DIV");
  _viewer.container.appendChild(div);
  div.setAttribute("id", "eagleEyeMap");
  div.style.zIndex = "9999";
  div.style.position = "absolute";
  div.style.width = window.screen.width / 6.6;    // 按屏幕比例缩小6.6倍
  div.style.height = window.screen.height / 6.6;    // 按屏幕比例缩小6.6倍
  div.style.right = "10px";
  div.style.bottom = "10px";
  div.style.border = "1px solid #ffffff";

  // 实例化鹰眼图
  _viewer2D = new Cesium.Viewer('eagleEyeMap', {
    homeButton : false,
    fullscreenButton : false,
    baseLayerPicker: false,
    sceneModePicker : false,
    clockViewModel : new Cesium.ClockViewModel(),
    infoBox : false,
    geocoder : false,
    sceneMode : Cesium.SceneMode.SCENE2D,
    navigationHelpButton : false,
    animation : false,
    timeline: false,
    imageryProvider: options.imageryProvider
  });
  // 设置鹰眼图不能编辑
  _viewer2D.scene.screenSpaceCameraController.enableRotate = false;
  _viewer2D.scene.screenSpaceCameraController.enableTranslate = false;
  _viewer2D.scene.screenSpaceCameraController.enableZoom = false;
  _viewer2D.scene.screenSpaceCameraController.enableTilt = false;
  _viewer2D.scene.screenSpaceCameraController.enableLook = false;
}

function sync2DView() {
  // The center of the view is the point that the 3D camera is focusing on
  let viewCenter = new Cesium.Cartesian2(Math.floor(_viewer.canvas.clientWidth / 2), Math.floor(_viewer.canvas.clientHeight / 2));
  // Given the pixel in the center, get the world position
  let newWorldPosition = _viewer.scene.camera.pickEllipsoid(viewCenter);
  if (Cesium.defined(newWorldPosition)){
    // Guard against the case where the center of the screen
    // does not fall on a position on the globe
    _worldPosition = newWorldPosition;
  }
  // Get the _distance between the world position of the point the camera is focusing on, and the camera's world position
  _distance = Cesium.Cartesian3.distance(_worldPosition, _viewer.scene.camera.positionWC);
  // Tell the 2D camera to look at the point of focus. The _distance controls how zoomed in the 2D view is
  // (try replacing `_distance` in the line below with `1e7`. The view will still sync, but will have a constant zoom)
  _viewer2D.scene.camera.lookAt(_worldPosition, new Cesium.Cartesian3(0.0, 0.0, _distance));
}

// 点位数据聚合功能
function loadClusterPoints() {
  let options = {
    camera: _viewer.scene.camera,
    canvas: _viewer.scene.canvas
  }

  let dataSourcePromise = _viewer.dataSources.add(Cesium.KmlDataSource.load("../../../static/SampleData/kml/facilities/facilities.kml", options));
  dataSourcePromise.then(function(dataSource) {
    let pixelRange = 15;
    let minimumClusterSize = 3;
    let enabled = true;

    dataSource.clustering.enabled = enabled;
    dataSource.clustering.pixelRange = pixelRange;
    dataSource.clustering.minimumClusterSize = minimumClusterSize;

    let removeListener;

    let pinBuilder = new Cesium.PinBuilder();
    let pin50 = pinBuilder.fromText('50+', Cesium.Color.RED, 48).toDataURL();
    let pin40 = pinBuilder.fromText('40+', Cesium.Color.ORANGE, 48).toDataURL();
    let pin30 = pinBuilder.fromText('30+', Cesium.Color.YELLOW, 48).toDataURL();
    let pin20 = pinBuilder.fromText('20+', Cesium.Color.GREEN, 48).toDataURL();
    let pin10 = pinBuilder.fromText('10+', Cesium.Color.BLUE, 48).toDataURL();

    let singleDigitPins = new Array(8);
    for (let i = 0; i < singleDigitPins.length; i++) {
      singleDigitPins[i] = pinBuilder.fromText('10+', Cesium.Color.BLUE, 48).toDataURL();
    }

    function customStyle() {
      if (Cesium.defined(removeListener)) {
        removeListener();
        removeListener = undefined;
      } else {
        removeListener = dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
          cluster.label.show = false;
          cluster.billboard.show = true;
          cluster.billboard.id = cluster.label.id;
          cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;

          if (clusteredEntities.length >= 50) {
            cluster.billboard.image = pin50;
          } else if (clusteredEntities.length >= 40) {
            cluster.billboard.image = pin40;
          } else if (clusteredEntities.length >= 30) {
            cluster.billboard.image = pin30;
          } else if (clusteredEntities.length >= 20) {
            cluster.billboard.image = pin20;
          } else if (clusteredEntities.length >= 10) {
            cluster.billboard.image = pin10;
          } else {
            cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2];
          }
        });
      }

      let pixelRange = dataSource.clustering.pixelRange;
      dataSource.clustering.pixelRange = 0;
      dataSource.clustering.pixelRange = pixelRange;
    }

    customStyle();
  });
}
