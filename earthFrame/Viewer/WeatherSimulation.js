/**
 * Created by Administrator on 2019/4/28.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';
import earthCommon from '../Common/earthCommon';
import '../Common/weatherLib';

const WeatherSimulation = (function () {
  let _viewer = null;
  let _scene = null;
  let _rain = null;
  let _snow = null;
  class WeatherSimulation {
    constructor(viewer, options) {
      _viewer = viewer;
      _scene = viewer.scene;
      let defaultOptions = {};
      if (options) {
        options = earthCommon.copyOptions(options, defaultOptions);
      }
      else
        options = defaultOptions;
    }

    weatherGenerator(weather, lat, lon, stadia) {
      //取消双击事件
      _viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      //设置homebutton的位置
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(lon - 1, lat - 1, lon + 1, lat + 1);//Rectangle(west, south, east, north)
      //设置初始位置
      _viewer.camera.setView({
        destination : new Cesium.Cartesian3(lat, lon, stadia),
        orientation : {
          heading : 4.731089976107251,
          pitch : -0.12003481981370063
        }
      });
      let _this = this;
      switch (weather) {
        case "rain":
          _this.showRain();
          break;
        case "snow":
          _this.showSnow();
          break;
      }
    }

    /**
     * 清除天气效果
     */
    removeStage(type) {
      switch (type) {
        case 'rain':
          _rain && _scene.postProcessStages.remove(_rain), _rain = null;
          break;
        case 'snow':
          _snow && _scene.postProcessStages.remove(_snow), _snow = null;
          break;
      }

    }

    /**
     * 显示下雨的场景效果
     */
    showRain() {
      this.removeStage('rain');
      let collection = _scene.postProcessStages;
      //定义下雨场景 着色器
      let fs_rain = "uniform sampler2D colorTexture;\n\
            varying vec2 v_textureCoordinates;\n\
          \n\
            float hash(float x){\n\
              return fract(sin(x*133.3)*13.13);\n\
          }\n\
          \n\
          void main(void){\n\
          \n\
            float time = czm_frameNumber / 60.0;\n\
          vec2 resolution = czm_viewport.zw;\n\
          \n\
          vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
          vec3 c=vec3(.6,.7,.8);\n\
          \n\
          float a=-.4;\n\
          float si=sin(a),co=cos(a);\n\
          uv*=mat2(co,-si,si,co);\n\
          uv*=length(uv+vec2(0,4.9))*.3+1.;\n\
          \n\
          float v=1.-sin(hash(floor(uv.x*100.))*2.);\n\
          float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n\
          c*=v*b; \n\
          \n\
          gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5);  \n\
          }\n\
    ";
      _rain = new Cesium.PostProcessStage({
        name: 'czm_rain',
        fragmentShader: fs_rain
      });
      collection.add(_rain);
      // 根据天气情况定义环境参数
      _scene.skyAtmosphere.hueShift = -0.8;
      _scene.skyAtmosphere.saturationShift = -0.7;
      _scene.skyAtmosphere.brightnessShift = -0.33;
      _scene.fog.density = 0.001;
      _scene.fog.minimumBrightness = 0.8;
    }

    /**
     * 显示下雪的场景效果
     */
    showSnow() {
      this.removeStage('snow');
      let collection1 = _scene.postProcessStages;
      //定义下雪场景 着色器
      let fs_snow = "uniform sampler2D colorTexture;\n\
    varying vec2 v_textureCoordinates;\n\
\n\
    float snow(vec2 uv,float scale)\n\
    {\n\
        float time = czm_frameNumber / 60.0;\n\
        float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n\
        uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n\
        uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n\
        p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n\
        k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
        return k*w;\n\
    }\n\
\n\
    void main(void){\n\
        vec2 resolution = czm_viewport.zw;\n\
        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
        vec3 finalColor=vec3(0);\n\
        float c = 0.0;\n\
        c+=snow(uv,30.)*.0;\n\
        c+=snow(uv,20.)*.0;\n\
        c+=snow(uv,15.)*.0;\n\
        c+=snow(uv,10.);\n\
        c+=snow(uv,8.);\n\
    c+=snow(uv,6.);\n\
        c+=snow(uv,5.);\n\
        finalColor=(vec3(c)); \n\
        gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.5); \n\
\n\
    }\n\
";
      _snow = new Cesium.PostProcessStage({
        name: 'czm_snow',
        fragmentShader: fs_snow
      });
      collection1.add(_snow);
      // 根据天气情况定义环境参数
      _scene.skyAtmosphere.hueShift = -0.8;
      _scene.skyAtmosphere.saturationShift = -0.7;
      _scene.skyAtmosphere.brightnessShift = -0.33;
      _scene.fog.density = 0.001;
      _scene.fog.minimumBrightness = 0.8;
    }
  }

  return WeatherSimulation;
})();

export default WeatherSimulation;
