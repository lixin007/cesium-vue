/**
 * Created by Administrator on 2019/2/18.
 */
import earthViewer from './Viewer/earthViewer'
import earthCommon from './Common/earthCommon'
export default class EarthApi {
  constructor() {}

  /**
   * 球的基础操作功能类
   * @type {Viewer}
   */
  static Earth = class extends earthViewer {
    constructor(element, options) {
      let defaultOptions = {
        token: 'abcdefghijklnmopqrstuvwxyz123456',
        baseUrl: 'http://183.232.33.177:9080/webearth'
      };
      options = earthCommon.copyOptions(options, defaultOptions);
      super(element, options);
    }

    // // 标绘工具类
    DrawHelper(options) {
      return super.DrawHelper(options);
    }
    // 测量工具类
    MeasureHelper(options) {
      return super.MeasureHelper(options);
    }
    // 搜索工具类
    SearchHelper(options) {
      return super.SearchHelper(options);
    }
    // 倾斜摄影模型类
    TilesHelper(options) {
      return super.TilesHelper(options);
    }
    // 天气模拟器类
    WeatherSimulation(options) {
      return super.WeatherSimulation(options);
    }
    // 基础图层管理类
    ImageryProvider(options) {
      return super.ImageryProvider(options);
    }
    // 粒子系统类
    ParticleSystem(options) {
      return super.ParticleSystem(options);
    }
  }
}
