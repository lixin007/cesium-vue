/**
 * Created by Administrator on 2019/5/20.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';
import earthCommon from '../../Common/earthCommon';

let _viewer = null
let _scene = null;
let _globe = null;
let _layer = null;
export default class EarthConfig {
  constructor(viewer, options) {
    _viewer = viewer;
    _scene = _viewer.scene;
    _globe = _scene.globe;
  }

  /**
   * 大气效果
   * @param trueOrFalse
   */
  showGroundAtmosphere(trueOrFalse) {
    _globe.showGroundAtmosphere = trueOrFalse;
  }

  /**
   * 光照效果
   * @param trueOrFalse
   */
  showIlluminationEffect(trueOrFalse) {
    _globe.enableLighting = trueOrFalse;
  }

  /**
   * 水波纹效果
   * @param trueOrFalse
   */
  showWaterEffect(trueOrFalse) {
    _viewer.terrainProvider = Cesium.createWorldTerrain({
      requestWaterMask : trueOrFalse
    });
  }

  /**
   * 图层基础参数设置
   * @param paramsOptions
   */
  setImageryLayersParams(paramsOptions) {
    if(!paramsOptions)
      paramsOptions = {};
    let defaultOptions = {
      brightness: 1,
      contrast: 1,
      hue: 0,
      saturation: 1,
      gamma: 1
    };
    paramsOptions = earthCommon.copyOptions(paramsOptions, defaultOptions);
    let imageryLayers = _viewer.imageryLayers;
    if (imageryLayers.length > 0) {
      _layer = imageryLayers.get(0);
    }
    _layer.brightness = paramsOptions.brightness;
    _layer.contrast = paramsOptions.contrast;
    _layer.hue = paramsOptions.hue;
    _layer.saturation = paramsOptions.saturation;
    _layer.gamma = paramsOptions.gamma;
  }
}
