/**
 * Created by Administrator on 2019/4/30.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';

let _viewer = null;
let layerManager = {};
let _viewer2D = null;
export default class ImageryProvider {
  constructor(viewer, viewer2D, options){
    _viewer = viewer;
    _viewer2D = viewer2D;
    this.options = options;
    if (_viewer.imageryLayers.length > 0)
      layerManager.baseLayer = _viewer.imageryLayers.get(0);

    imageryLayersSplit();
  }

  addImageryProvider(type) {
    let imageryProvider = null;
    if (type != "road" && type != "water" &&layerManager.hasOwnProperty("baseLayer") && layerManager.baseLayer != undefined && layerManager.baseLayer != null && layerManager.baseLayer != "")
      _viewer.imageryLayers.remove(layerManager.baseLayer);
    switch (type) {
      // 谷歌默认
      case 'google_default':
        layerManager.baseLayer = _viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=m@198&gl=en&x={x}&y={y}&z={z}"}));
        _viewer.imageryLayers.lowerToBottom(layerManager.baseLayer);
        if (_viewer2D) {
          _viewer2D.imageryLayers.removeAll();
          _viewer2D.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=m@198&gl=en&x={x}&y={y}&z={z}"}));
        }
        break;
      // 谷歌卫星
      case 'google_satellite':
        layerManager.baseLayer = _viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=y@198&gl=en&x={x}&y={y}&z={z}"}));
        if (_viewer2D) {
          _viewer2D.imageryLayers.removeAll();
          _viewer2D.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=y@198&gl=en&x={x}&y={y}&z={z}"}));
        }
        _viewer.imageryLayers.lowerToBottom(layerManager.baseLayer);
        break;
      // 谷歌地形
      case 'google_terrain':
        layerManager.baseLayer = _viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=t@198&gl=en&x={x}&y={y}&z={z}"}));
        if (_viewer2D) {
          _viewer2D.imageryLayers.removeAll();
          _viewer2D.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=t@198&gl=en&x={x}&y={y}&z={z}"}));
        }
        _viewer.imageryLayers.lowerToBottom(layerManager.baseLayer);
        break;
      // 高德卫星
      case 'gaode_satellite':
        layerManager.baseLayer = _viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
          url: 'http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&L={z}&Z={z}&Y={y}&X={x}',
          subdomains: ['webst01', 'webst02', 'webst03', 'webst04'],
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          maximumLevel: 18
        }));
        _viewer.imageryLayers.lowerToBottom(layerManager.baseLayer);
        if (_viewer2D) {
          _viewer2D.imageryLayers.removeAll();
          _viewer2D.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&L={z}&Z={z}&Y={y}&X={x}',
            subdomains: ['webst01', 'webst02', 'webst03', 'webst04'],
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            maximumLevel: 18
          }));
        }
        break;
      // 高德街道
      case 'gaode_street':
        layerManager.baseLayer = _viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
          url: 'http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&L={z}&Z={z}&Y={y}&X={x}',
          subdomains: ['webrd01', 'webrd02', 'webrd03', 'webrd04'],
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          maximumLevel: 18
        }));
        _viewer.imageryLayers.lowerToBottom(layerManager.baseLayer);
        if (_viewer2D) {
          _viewer2D.imageryLayers.removeAll();
          _viewer2D.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&L={z}&Z={z}&Y={y}&X={x}',
            subdomains: ['webrd01', 'webrd02', 'webrd03', 'webrd04'],
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            maximumLevel: 18
          }));
        }
        break;
      case 'road':
        if (layerManager.hasOwnProperty("road") && layerManager["road"] != undefined && layerManager["road"] != null && layerManager["road"] != "") {
          _viewer.imageryLayers.remove(layerManager["road"]);
          if (_viewer2D) {
            _viewer2D.imageryLayers.remove(layerManager["road2D"]);
          }
          delete layerManager.road;
          break;
        }
        let road = _viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
          url: 'http://183.232.33.177:9080/webearth/tiles/road/{z}/{x}/{reverseY}.png'
        }));
        if (_viewer2D) {
          let road2D = _viewer2D.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            url: 'http://183.232.33.177:9080/webearth/tiles/road/{z}/{x}/{reverseY}.png'
          }));
          layerManager["road2D"] = road2D;
        }
        layerManager["road"] = road;
        break;
      case 'water':
        if (layerManager.hasOwnProperty("water") && layerManager["water"] != undefined && layerManager["water"] != null && layerManager["water"] != "") {
          _viewer.imageryLayers.remove(layerManager["water"]);
          if (_viewer2D) {
            _viewer2D.imageryLayers.remove(layerManager["water2D"]);

          }
          delete layerManager.water;
          break;
        }
        let water = _viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
          url: 'http://183.232.33.177:9080/webearth/tiles/water/{z}/{x}/{reverseY}.png'
        }));
        if (_viewer2D) {
          let water2D = _viewer2D.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            url: 'http://183.232.33.177:9080/webearth/tiles/water/{z}/{x}/{reverseY}.png'
          }));
          layerManager["water2D"] = water2D;
        }
        layerManager["water"] = water;
        break;
      default:
        break;
    }
  }
  showImageryLayersSplit(show) {
    imageryLayersSplit(show);
  }
}

function imageryLayersSplit(show) {
  if (show) {
    let slider = null;
    if (!document.getElementById("slider")) {
      slider = document.createElement("DIV");
      _viewer.container.appendChild(slider);
      slider.setAttribute("id", "slider");
      slider.style.position = "absolute";
      slider.style.left = "50%";
      slider.style.top = "0px";
      slider.style.backgroundColor = "#D3D3D3";
      slider.style.width = "5px";
      slider.style.height = "100%";
      slider.style.zIndex = "9999";
      slider.style.cursor = "w-resize"
    } else {
      document.getElementById("slider").style.display = "block";
      slider = document.getElementById("slider");
    }
    let layer = _viewer.imageryLayers;
    let leftLayer = layer.addImageryProvider(new Cesium.UrlTemplateImageryProvider({url: "http://www.google.cn/maps/vt?lyrs=m@198&gl=en&x={x}&y={y}&z={z}"}));
    layerManager["leftLayer"] = leftLayer;
    leftLayer.splitDirection = Cesium.ImagerySplitDirection.LEFT;

    _viewer.scene.imagerySplitPosition = (slider.offsetLeft) / slider.parentElement.offsetWidth;
    let handler = new Cesium.ScreenSpaceEventHandler(slider);
    let moveActive = false;

    let move = function (movement) {
      if (!moveActive) {
        return;
      }

      var relativeOffset = movement.endPosition.x;
      var splitPosition = (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
      slider.style.left = 100.0 * splitPosition + '%';
      _viewer.scene.imagerySplitPosition = splitPosition;
    }

    handler.setInputAction(function () {
      moveActive = true;
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction(function () {
      moveActive = true;
    }, Cesium.ScreenSpaceEventType.PINCH_START);

    handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

    handler.setInputAction(function () {
      moveActive = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
    handler.setInputAction(function () {
      moveActive = false;
    }, Cesium.ScreenSpaceEventType.PINCH_END);
  } else {
    if (document.getElementById("slider")) {
      document.getElementById("slider").style.display = "none";
      if (layerManager.hasOwnProperty("leftLayer") && layerManager["leftLayer"] != undefined && layerManager["leftLayer"] != null && layerManager["leftLayer"] != "") {
        _viewer.imageryLayers.remove(layerManager["leftLayer"]);
      }
    }
  }
}
