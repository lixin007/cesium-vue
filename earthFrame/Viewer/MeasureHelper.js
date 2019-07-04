/**
 * Created by Administrator on 2019/2/20.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';
let _viewer = null;
let tempPoints = [];
let tempEntities = [];
let earthRadiusMeters = 6371000.0;
let radiansPerDegree = Math.PI / 180.0;
let degreesPerRadian = 180.0 / Math.PI;
let handler = null;
const MeasureHelper = (function () {
  class MeasureHelper {
    constructor(viewer, options) {
      _viewer = viewer;
      handler = new Cesium.ScreenSpaceEventHandler(_viewer.canvas);
    }

    createMeasureEvent(mode, callback) {
      if (mode === 'drawPloy') {
        tempPoints = []
        if (handler == null || handler.isDestroyed())
          handler = new Cesium.ScreenSpaceEventHandler(_viewer.canvas);
        handler.setInputAction(function (click) {
          let cartesian = _viewer.camera.pickEllipsoid(click.position, _viewer.scene.globe.ellipsoid)
          if (cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            let latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            tempPoints.push({lon: longitudeString, lat: latitudeString});
            let tempLength = tempPoints.length;
            drawPoint(tempPoints[tempPoints.length - 1]);
            if (tempLength > 1) {
              drawLine(tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1], true, mode)
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function (click) {
          let cartesian = _viewer.camera.pickEllipsoid(click.position, _viewer.scene.globe.ellipsoid);
          if (cartesian) {
            let tempLength = tempPoints.length;
            if (tempLength < 3) {
              alert('请选择3个以上的点再执行闭合操作命令');
            } else {
              drawLine(tempPoints[0], tempPoints[tempPoints.length - 1], true, mode);
              drawPoly(tempPoints);

              let ent = _viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(((tempPoints[0].lon + (tempPoints[tempPoints.length - 1].lon + tempPoints[tempPoints.length - 2].lon) / 2) / 2 ),
                  ((tempPoints[0].lat + (tempPoints[tempPoints.length - 1].lat + tempPoints[tempPoints.length - 2].lat) / 2 ) / 2)),
                label: {
                  text: SphericalPolygonAreaMeters(tempPoints).toFixed(1) + '㎡',
                  font: '22px Helvetica',
                  fillColor: Cesium.Color.WHITE
                }
              })
              tempEntities.push(ent);
              tempPoints = [];
              if (!handler.isDestroyed())
                handler.destroy();
              if (typeof callback === 'function')
                callback();
            }
          }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      } else if (mode === 'drawLine') {
        tempPoints = []
        if (handler == null || handler.isDestroyed())
          handler = new Cesium.ScreenSpaceEventHandler(_viewer.canvas);
        handler.setInputAction(function (click) {
          let cartesian = _viewer.camera.pickEllipsoid(click.position, _viewer.scene.globe.ellipsoid);
          if (cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            let latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            tempPoints.push({lon: longitudeString, lat: latitudeString});
            let tempLength = tempPoints.length;
            drawPoint(tempPoints[tempPoints.length - 1]);
            if (tempLength > 1) {
              drawLine(tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1], true, mode);
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        handler.setInputAction(function (click) {
          let tempLength = tempPoints.length;
          if (tempLength < 2) {
            alert('请选择2个以上的点再执行结束测量操作命令');
          } else {
            tempPoints = [];
            if (!handler.isDestroyed())
              handler.destroy();
            if (typeof callback === 'function')
              callback();
          }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      } else if (mode === 'cleanUp') {
        let primitives = _viewer.entities;
        for (let i = 0; i < tempEntities.length; i++) {
          primitives.remove(tempEntities[i]);
        }
        tempEntities = [];
        if (!handler.isDestroyed())
          handler.destroy();
      }
    }
  }
  return MeasureHelper;
})()

function drawPoint(point) {
  let entity = _viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat),
    label: {
      text: '',
      font: '5px Helvetica'
    },
    point: {
      pixelSize: 5,
      color: Cesium.Color.WHITE
    }
  });
  tempEntities.push(entity);
}

function drawLine(point1, point2, showDistance, mode) {
  let entity = _viewer.entities.add({
    polyline: {
      positions: [Cesium.Cartesian3.fromDegrees(point1.lon, point1.lat), Cesium.Cartesian3.fromDegrees(point2.lon, point2.lat)],
      width: 10.0,
      material: new Cesium.PolylineGlowMaterialProperty({
        color: Cesium.Color.GREEN.withAlpha(.5)
      })
    }
  });
  tempEntities.push(entity);
  if (showDistance) {
    let w = Math.abs(point1.lon - point2.lon)
    let h = Math.abs(point1.lat - point2.lat)
    let offsetV = w >= h ? 0.0005 : 0
    let offsetH = w < h ? 0.001 : 0
    let distance = getFlatternDistance(point1.lat, point1.lon, point2.lat, point2.lon)
    let label = {}
    entity =
      _viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(((point1.lon + point2.lon) / 2),
          ((point1.lat + point2.lat) / 2)),
        label: ('drawLine' == mode ? {
          text: distance.toFixed(1) + 'm',
          font: '22px Helvetica',
          fillColor: Cesium.Color.WHITE
        } : '')
      });
    tempEntities.push(entity)
  }
}

function drawPoly(points) {
  let pArray = []
  for (let i = 0; i < points.length; i++) {
    pArray.push(points[i].lon)
    pArray.push(points[i].lat)
  }
  let entity = _viewer.entities.add({
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(pArray)),
      material: Cesium.Color.GREEN.withAlpha(.5)
    }
  });
  tempEntities.push(entity)
}

function getFlatternDistance(lat1, lng1, lat2, lng2) {
  let EARTH_RADIUS = 6378137.0    //单位M
  let PI = Math.PI

  function getRad(d) {
    return d * PI / 180.0
  }

  let f = getRad((lat1 + lat2) / 2)
  let g = getRad((lat1 - lat2) / 2)
  let l = getRad((lng1 - lng2) / 2)

  let sg = Math.sin(g)
  let sl = Math.sin(l)
  let sf = Math.sin(f)

  let s, c, w, r, d, h1, h2
  let a = EARTH_RADIUS
  let fl = 1 / 298.257

  sg = sg * sg
  sl = sl * sl
  sf = sf * sf

  s = sg * (1 - sl) + (1 - sf) * sl
  c = (1 - sg) * (1 - sl) + sf * sl

  w = Math.atan(Math.sqrt(s / c))
  r = Math.sqrt(s * c) / w
  d = 2 * w * a
  h1 = (3 * r - 1) / 2 / c
  h2 = (3 * r + 1) / 2 / s

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
}

function SphericalPolygonAreaMeters(points) {
  let totalAngle = 0;
  for (let i = 0; i < points.length; i++) {
    let j = (i + 1) % points.length
    let k = (i + 2) % points.length
    totalAngle += Angle(points[i], points[j], points[k])
  }
  let planarTotalAngle = (points.length - 2) * 180.0
  let sphericalExcess = totalAngle - planarTotalAngle
  if (sphericalExcess > 420.0) {
    totalAngle = points.length * 360.0 - totalAngle
    sphericalExcess = totalAngle - planarTotalAngle
  } else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
    sphericalExcess = Math.abs(360.0 - sphericalExcess)
  }
  return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters;
}

function Angle(p1, p2, p3) {
  let bearing21 = Bearing(p2, p1)
  let bearing23 = Bearing(p2, p3)
  let angle = bearing21 - bearing23
  if (angle < 0) {
    angle += 360
  }
  return angle;
}

function Bearing(from, to) {
  let lat1 = from.lat * radiansPerDegree
  let lon1 = from.lon * radiansPerDegree
  let lat2 = to.lat * radiansPerDegree
  let lon2 = to.lon * radiansPerDegree
  let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2))
  if (angle < 0) {
    angle += Math.PI * 2.0
  }
  angle = angle * degreesPerRadian
  return angle
}

export { MeasureHelper };
