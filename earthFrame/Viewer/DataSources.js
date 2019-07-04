/**
 * Created by Administrator on 2019/6/11.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';
import earthCommon from '../Common/earthCommon';

/**
 * GeoJson数据类
 */
const GeoJsonDataSource = (function () {
  let _viewer = null;
  class GeoJsonDataSource {
    constructor(viewer){
      _viewer = viewer;
    };

    load(url, options) {
      let defaultOptions = {
        stroke: Cesium.Color.WHITE,
        fill: Cesium.Color.YELLOW,
        strokeWidth: 50,
        markerSymbol: '?',
        // 自定义参数项
        flyTo: false  // 是否定位到GeoJson数据加载结果
      };
      if (options) {
        options = earthCommon.copyOptions(options, defaultOptions);
      }
      else {
        options = defaultOptions;
      }
      let entities = null;
      const promise = Cesium.GeoJsonDataSource.load(url, options);
      promise.then(function (dataSource) {
        _viewer.dataSources.add(dataSource)
        entities = dataSource.entities.values;

        /** 参数配置解析 start **/
        if (options.flyTo) {
          _viewer.flyTo(_viewer.dataSources.add(promise));
        }
        /** 参数配置解析 end **/
        /*_viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
          // If a feature was previously highlighted, undo the highlight
          let pickedFeature = _viewer.scene.pick(movement.position);
          if (!Cesium.defined(pickedFeature)) {
            return;
          }
          for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (entity.id == pickedFeature.id._id) {
              console.log(entity.id);
              entity.polygon.material = Cesium.Color.fromRandom({
                alpha: 0.1
              });
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);*/
      });
    }
  }

  return GeoJsonDataSource;
})();

/**
 * CZML数据类
 */
const CZMLDataSource = (function () {
  class CZMLDataSource {

  }
  return CZMLDataSource;
})();

export { GeoJsonDataSource, CZMLDataSource };
