/**
 * Created by Administrator on 2019/5/14.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';

let _viewer = null;
export default class ParticleSystem {
  constructor(viewer, options) {
    _viewer = viewer;
    let scene = viewer.scene;
    scene.debugShowFramesPerSecond = true;

  }

  computeModelMatrix(entity, time) {
    let position = Cesium.Property.getValueOrUndefined(entity.position, time, new Cesium.Cartesian3());
    if (!Cesium.defined(position)) {
      return undefined;
    }
    let orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, new Cesium.Quaternion());
    let modelMatrix;
    if (!Cesium.defined(orientation)) {
      modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, new Cesium.Matrix4());
    } else {
      modelMatrix = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation, new Cesium.Matrix3()), position, new Cesium.Matrix4());
    }
    return modelMatrix;
  }

  computeEmitterModelMatrix() {
    let hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, new Cesium.HeadingPitchRoll());
    let trs = new Cesium.TranslationRotationScale();
    trs.translation = Cesium.Cartesian3.fromElements(2.5, 4.0, 1.0, new Cesium.Cartesian3());
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, new Cesium.Quaternion());
    return Cesium.Matrix4.fromTranslationRotationScale(trs, new Cesium.Matrix4());
  }

  addParticleSystem() {
    let entity = _viewer.entities.add({
      model: {
        uri: '../../../../static/SampleData/models/CesiumAir/Cesium_Air.gltf',
        minimumPixelSize : 64
      },
      position: Cesium.Cartesian3.fromDegrees(-112.110693, 36.0994841, 1000.0)
    });
    _viewer.trackedEntity = entity;
    let particleSystem = _viewer.scene.primitives.add(new Cesium.ParticleSystem({
      image: '../../../../static/SampleData/fire.png',
      startScale: 1.0,
      endScale: 4.0,
      particleLife: 1.0,
      speed: 5.0,
      imageSize: new Cesium.Cartesian2(20, 20),
      emissionRate: 5.0,
      lifetime : 16.0,
      modelMatrix : this.computeModelMatrix(entity, Cesium.JulianDate.now()),
      emitterModelMatrix : this.computeEmitterModelMatrix()
    }));
  }
}
