/**
 * Created by Administrator on 2019/3/22.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';
import earthCommon from '../Common/earthCommon';

const TilesHelper = (function () {
  let _viewer = null;
  class TilesHelper {
    constructor(viewer, options) {
      let defaultOptions = {};
      if (options) {
        options = earthCommon.copyOptions(options, defaultOptions);
      }
      else
        options = defaultOptions;
      _viewer = viewer;
      this.options = options;
      this.tilesInfoManager = [];
    }

    init3DtilesInfoManager(arr) {
      this.tilesInfoManager = arr;
    }

    manager3DTiles(key, isClean = false) {
      let _this = this;
      if (!isClean) {
        for (let i in _this.tilesInfoManager) {
          if (key === _this.tilesInfoManager[i].key) {

            // 清除其他倾斜模型的加载
            for (let j in _this.tilesInfoManager) {
              if (_this.tilesInfoManager[j].tileset && _this.tilesInfoManager[j].tileset != null && _this.tilesInfoManager[j].key !== key) {
                _viewer.scene.primitives.remove(_this.tilesInfoManager[j].tileset)
              }
            }
            let tileset = _viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
              // url: '../../../static/STIDC-3DTiles/Scene/STIDCm3DTiles.json'
              url: _this.tilesInfoManager[i].url
            }));
            this.tilesInfoManager[i].tileset = tileset;
            _viewer.flyTo(tileset);
            break;
          }
        }
      } else {

      }
    }
  }

  return TilesHelper;
})();

export default TilesHelper;
