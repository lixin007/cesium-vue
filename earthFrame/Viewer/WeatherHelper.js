/**
 * Created by Administrator on 2019/5/29.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';
import DataProcess from './3d-wind/dataProcess';
import ParticleSystem from './3d-wind/particleSystem';
import Util from './3d-wind/util';
import earthCommon from '../Common/earthCommon';

const WeatherHelper = (function () {
  let _viewer = null;
  let _particleSystem = null;
  let _viewerParameters = null;
  let _globeBoundingSphere = null;
  class WeatherHelper {
    constructor(viewer, options) {
      let defaultOptions = {};
      if (options) {
        options = earthCommon.copyOptions(options, defaultOptions);
      }
      else
        options = defaultOptions;
      _viewer = viewer;
      _globeBoundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, 0.99 * 6378137.0);
    }

    /**
     * 显示风向图，带配置
     * @param options 配置参数
     */
    show3DWind(options) {
      let dataProcess = new DataProcess();
      dataProcess.loadData().then(
        (data) => {
          console.log(data);
          let params = {
            maxParticles: 16384,
            particleHeight: 5000,
            fadeOpacity: 0.996,
            dropRate: 0.003,
            dropRateBump: 0.01,
            speedFactor: 4,
            lineWidth: 4,
          }
          _viewerParameters = {
            lonRange: new Cesium.Cartesian2(),
            latRange: new Cesium.Cartesian2(),
            pixelSize: 0.0
          };
          params.particlesTextureSize = Math.ceil(Math.sqrt(params.maxParticles));
          _particleSystem = new ParticleSystem(_viewer.scene.context, data, params, _viewerParameters);
          this.addPrimitives();
          this.setupEventListeners();
        }
      );
    }

    addPrimitives() {
      // the order of primitives.add() should respect the dependency of primitives
      _viewer.scene.primitives.add(_particleSystem.particlesComputing.primitives.getWind);
      _viewer.scene.primitives.add(_particleSystem.particlesComputing.primitives.updateSpeed);
      _viewer.scene.primitives.add(_particleSystem.particlesComputing.primitives.updatePosition);
      _viewer.scene.primitives.add(_particleSystem.particlesComputing.primitives.postProcessingPosition);
      _viewer.scene.primitives.add(_particleSystem.particlesComputing.primitives.postProcessingSpeed);

      _viewer.scene.primitives.add(_particleSystem.particlesRendering.primitives.segments);
      _viewer.scene.primitives.add(_particleSystem.particlesRendering.primitives.trails);
      _viewer.scene.primitives.add(_particleSystem.particlesRendering.primitives.screen);
    }

    setupEventListeners() {
      const that = this;

      _viewer.camera.moveStart.addEventListener(function () {
        _viewer.scene.primitives.show = false;
      });

      _viewer.camera.moveEnd.addEventListener(function () {
        that.updateViewerParameters();
        _particleSystem.applyViewerParameters(_viewerParameters);
        _viewer.scene.primitives.show = true;
      });

      var resized = false;
      window.addEventListener("resize", function () {
        resized = true;
        _viewer.scene.primitives.show = false;
        _viewer.scene.primitives.removeAll();
      });

      _viewer.scene.preRender.addEventListener(function () {
        if (resized) {
          _particleSystem.canvasResize(_viewer.scene.context);
          resized = false;
          that.addPrimitives();
          _viewer.scene.primitives.show = true;
        }
      });
    }

    updateViewerParameters() {
      var viewRectangle = _viewer.camera.computeViewRectangle(_viewer.scene.globe.ellipsoid);
      let util = new Util();
      var lonLatRange = util.viewRectangleToLonLatRange(viewRectangle);
      _viewerParameters.lonRange.x = lonLatRange.lon.min;
      _viewerParameters.lonRange.y = lonLatRange.lon.max;
      _viewerParameters.latRange.x = lonLatRange.lat.min;
      _viewerParameters.latRange.y = lonLatRange.lat.max;

      var pixelSize = _viewer.camera.getPixelSize(
        _globeBoundingSphere,
        _viewer.scene.drawingBufferWidth,
        _viewer.scene.drawingBufferHeight
      );

      if (pixelSize > 0) {
        _viewerParameters.pixelSize = pixelSize;
      }
    }
  }
  return WeatherHelper;
})();

export default WeatherHelper;
