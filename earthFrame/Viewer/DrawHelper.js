/**
 * Created by Administrator on 2019/3/6.
 */
import Cesium from 'cesium/Cesium';
import earthCommon from '../Common/earthCommon';
import dragIcon from '../Icons/dragIcon.png';
import dragIconLight from '../Icons/dragIconLight.png';
import locationIcon from '../Icons/glyphicons_242_google_maps.png';
import widgets from 'cesium/Widgets/widgets.css';
import axios from 'axios';

/***********************通用变量定义************************/
let material = Cesium.Material.fromType(Cesium.Material.ColorType);
material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 0.5);

let defaultShapeOptions = {
  ellipsoid: Cesium.Ellipsoid.WGS84,
  textureRotationAngle: 0.0,
  height: 0.0,
  asynchronous: true,
  show: true,
  debugShowBoundingVolume: false
}

let defaultSurfaceOptions = earthCommon.copyOptions(defaultShapeOptions, {
  appearance: new Cesium.EllipsoidSurfaceAppearance({
    aboveGround: false
  }),
  material: material,
  granularity: Math.PI / 180.0
});

let defaultPolygonOptions = earthCommon.copyOptions(defaultShapeOptions, {});
let defaultExtentOptions = earthCommon.copyOptions(defaultShapeOptions, {});
let defaultCircleOptions = earthCommon.copyOptions(defaultShapeOptions, {});
let defaultEllipseOptions = earthCommon.copyOptions(defaultSurfaceOptions, { rotation: 0 });

let defaultPolylineOptions = earthCommon.copyOptions(defaultShapeOptions, {
  width: 5,
  geodesic: true,
  granularity: 10000,
  appearance: new Cesium.PolylineMaterialAppearance({
    aboveGround: false
  }),
  material: material
});

let defaultBillboard = {
  iconUrl: dragIcon,
  shiftX: 0,
  shiftY: 0
}

let dragBillboard = {
  iconUrl: dragIcon,
  shiftX: 0,
  shiftY: 0
}

let dragHalfBillboard = {
  iconUrl: dragIconLight,
  shiftX: 0,
  shiftY: 0
}

const DrawHelper = (function () {
  class DrawHelper {
    static host = null;
    static options = null;
    static ellipsoid = Cesium.Ellipsoid.WGS84;
    static viewer = null;
    static scene = null;
    static canvas = null;
    static tooltip = null;
    static primitivesManager = {
      "marker": [], "makerLabel": [], "polyline": [], "polygon": [], "allPrimitives": []
    };
    constructor(viewer, options) {
      DrawHelper.viewer = viewer;
      DrawHelper.scene = viewer.scene;
      DrawHelper.canvas = viewer.canvas;
      DrawHelper.tooltip = createTooltip(viewer.container);
      DrawHelper.options = earthCommon.copyOptions(options, {});
      DrawHelper.getPermissions();
      this.initialiseHandlers();
      this.enhancePrimitives();
      let videoElement = document.getElementById('trailer');
      let entity = DrawHelper.viewer.entities.add({
        name: 'box',
        position: Cesium.Cartesian3.fromDegrees(116.543398,39.881501,0),
        box:{
          dimensions: new Cesium.Cartesian3(8.0,0,6.0),
          material: videoElement
        }
      });

      // DrawHelper.viewer.entities.add({
      //   name: 'box',
      //   position: Cesium.Cartesian3.fromDegrees(116.543498,39.881501,0),
      //   box:{
      //     dimensions: new Cesium.Cartesian3(8.0,8.0,6.0),
      //     material: videoElement
      //   }
      // });
      //
      // DrawHelper.viewer.entities.add({
      //   name: 'ellipsoid',
      //   position: Cesium.Cartesian3.fromDegrees(116.543658,39.881501,0),
      //   ellipsoid:{
      //     radii: new Cesium.Cartesian3(6.0, 6.0, 6.0), //设置球体的xyz
      //     material: videoElement
      //   }
      // });
      //
      // DrawHelper.viewer.flyTo(entity);

      // let tileset = DrawHelper.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      //   url: '../../../static/STIDC-3DTiles/Scene/STIDCm3DTiles.json'
      // }));
      // DrawHelper.viewer.flyTo(tileset);

      createUploadElement();
    }

    static getPermissions(callback) {
      if (earthCommon.getCookie('sessionId') === '' || earthCommon.getCookie('permissionsList') === '') {
        // earthCommon.request(DrawHelper.options.baseUrl, {
        //   url: '/user/validate?token=' + DrawHelper.options.token,
        //   type: 'GET',
        //   async: false,   // 此处获取权限的操作中async设置为false，以确保获取权限之后其他的操作才被执行
        //   cache: false,
        //   processData: false,
        //   contentType: false,
        //   success: function (data) {
        //     console.log(data);
        //     let permissionsList = [];
        //     for (let item of data.list) {
        //       permissionsList.push(item.name);
        //     }
        //     earthCommon.setCookie('permissionsList', permissionsList, 7);
        //     earthCommon.setCookie('sessionId', data.sessionid, 7);
        //     if (typeof callback === 'function')
        //       callback();
        //   },
        //   error: function (data, type, err) {
        //     alert('权限获取接口出错，所有功能将不能使用，请联系后台人员')
        //   }
        // });
      }
    }

    // drawWater(targetHeight, adapCoordi) {
    //   var entity = DrawHelper.viewer.entities.add({
    //     polygon: {
    //       hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(adapCoordi),
    //       material: new Cesium.Color.fromBytes(64, 157, 253, 150),
    //       perPositionHeight: true,
    //       extrudedHeight: 0.0,
    //       // closeBottom:false
    //     }
    //   });
    //   console.log(entity);
    //   DrawHelper.viewer.zoomTo(entity);
    //   let waterHeight = adapCoordi[2]
    //   setInterval(() => {
    //     if (waterHeight < targetHeight) {
    //       waterHeight += 100
    //       if (waterHeight > targetHeight) {
    //         waterHeight = targetHeight
    //       }
    //       entity.polygon.extrudedHeight.setValue(waterHeight)
    //     }
    //   }, 100);
    // }

    muteHandlers(muted) {
      this._handlersMuted = muted;
    }
    startDrawing(cleanUp) {
      // undo any current edit of shapes
      this.disableAllEditMode();
      // check for cleanUp first
      if (this.editCleanUp) {
        this.editCleanUp();
      }
      this.editCleanUp = cleanUp;
      this.muteHandlers(true);
    }

    stopDrawing() {
      // check for cleanUp first
      if (this.editCleanUp) {
        this.editCleanUp();
        this.editCleanUp = null;
      }
      this.muteHandlers(false);
    }

    // make sure only one shape is highlighted at a time
    static disableAllHighlights() {
      this.setHighlighted(undefined);
    }

    static setHighlighted(surface) {
      if (this._highlightedSurface && !this._highlightedSurface.isDestroyed() && this._highlightedSurface != surface) {
        this._highlightedSurface.setHighlighted(false);
      }
      this._highlightedSurface = surface;
    }

    disableAllEditMode() {
      DrawHelper.setEdited(undefined);
    }

    static setEdited(surface) {
      if (this._editedSurface && !this._editedSurface.isDestroyed()) {
        this._editedSurface.setEditMode(false);
      }
      this._editedSurface = surface;
    }

    /**
     * 开始画线事件
     * @param options
     */
    startDrawingPolyline(options) {
      options = earthCommon.copyOptions(options, defaultPolylineOptions);
      this.startDrawingPolyshape(false, options);
    }

    /**
     * 开始画面事件
     * @param options
     */
    startDrawingPolygon(options) {
      options = earthCommon.copyOptions(options, defaultSurfaceOptions);
      this.startDrawingPolyshape(true, options);
    }

    startDrawingPolyshape(isPolygon, options) {
      let primitives = DrawHelper.scene.primitives;
      let minPoints = isPolygon ? 3 : 2;
      let poly;
      if (isPolygon) {
        poly = new DrawHelper.PolygonPrimitive(options);
      } else {
        poly = new DrawHelper.PolylinePrimitive(options);
      }
      let _this = this;
      poly.asynchronous = false;
      primitives.add(poly);
      let positions = [];
      let markers = new DrawHelper.BillboardGroup(_this, defaultBillboard);
      let tooltip = DrawHelper.tooltip;

      this.startDrawing(
        function () {
          primitives.remove(poly);
          markers.remove();
          mouseHandler.destroy();
          DrawHelper.tooltip.setVisible(false);
        }
      );

      let mouseHandler = new Cesium.ScreenSpaceEventHandler(DrawHelper.canvas);
      mouseHandler.setInputAction(function (movement) {
        if (movement.position != null) {
          var cartesian = DrawHelper.scene.camera.pickEllipsoid(movement.position, DrawHelper.ellipsoid);
          if (cartesian) {
            if (positions.length == 0) {
              positions.push(cartesian.clone());
              markers.addBillboard(positions[0]);
            }
            if (positions.length >= minPoints) {
              poly.positions = positions;
              poly._createPrimitive = true;
            }

            positions.push(cartesian);
            markers.addBillboard(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      mouseHandler.setInputAction(function (movement) {
        let position = movement.endPosition;
        if (position != null) {
          let cartesian = DrawHelper.scene.camera.pickEllipsoid(position, DrawHelper.ellipsoid);
          if (cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
            let latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
            if (positions.length == 0) {
              tooltip.showAt(new Cesium.Cartesian2(position.x, position.y), "<p>添加第一个点</p><p>经度：" + longitudeString + "°</p><p>纬度：" + latitudeString + "°</p>");
            } else {
              positions.pop();

              cartesian.y += (1 + Math.random());
              positions.push(cartesian);
              if (positions.length >= minPoints) {
                poly.positions = positions;
                poly._createPrimitive = true;
              }
              markers.getBillboard(positions.length - 1).position = cartesian;
              tooltip.showAt(new Cesium.Cartesian2(position.x, position.y), "<p>经度：" + longitudeString + "°</p><p>纬度：" + latitudeString + "°</p><p>添加一个新的坐标点 (" + positions.length + ")</p>" + (positions.length > minPoints ? "<p>右键完成多边形绘制</p>" : ""));
            }
          } else {
            tooltip.showAt(new Cesium.Cartesian2(position.x, position.y), "<p>请点击球体进行线或面添加</p>");
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      mouseHandler.setInputAction(function (movement) {
        var position = movement.position;
        if (position != null) {
          if (positions.length < minPoints) {
            return;
          } else {
            var cartesian = DrawHelper.scene.camera.pickEllipsoid(position, DrawHelper.ellipsoid);
            if (cartesian) {
              _this.stopDrawing();
              DrawHelper.tooltip.setVisible(false);
              if (typeof options.callback == 'function') {

                // var index = positions.length - 1;
                options.callback(positions);
              }
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    startDrawingMarker(options) {
      let primitives = DrawHelper.scene.primitives;
      let _this = this;
      let markers = new DrawHelper.BillboardGroup(_this, options);
      options = earthCommon.copyOptions(options, defaultBillboard);
      let tooltip = DrawHelper.tooltip;

      _this.startDrawing(
        function () {
          markers.remove();
          mouseHandler.destroy();
          tooltip.setVisible(false);
        }
      )

      let mouseHandler = new Cesium.ScreenSpaceEventHandler(DrawHelper.canvas);
      mouseHandler.setInputAction(function (movement) {
        if (movement.position != null) {
          let cartesian = DrawHelper.scene.camera.pickEllipsoid(movement.position, DrawHelper.ellipsoid);
          if (cartesian) {
            markers.addBillboard(cartesian);
            _this.stopDrawing();
            options.callback(cartesian);
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      mouseHandler.setInputAction(function (movement) {
        let position = movement.endPosition;
        if (position != null) {
          let cartesian = DrawHelper.scene.camera.pickEllipsoid(position, DrawHelper.ellipsoid);
          if (cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
            let latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
            tooltip.showAt(new Cesium.Cartesian2(position.x, position.y), "<p>添加点功能：点击添加标注 </p><p>经度：" + longitudeString + "°</p><p>纬度：" + latitudeString + "°</p>");
          } else {
            tooltip.showAt(new Cesium.Cartesian2(position.x, position.y), "<p>请点击球体进行标注添加</p>");
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    /**
     * 注册标绘事件
     * @param type 标绘事件类型
     * @param callback 标绘事件完成的回调函数
     */
    registerDrawEvent(type, callback) {
      const _this = this;
      enhanceWithListeners(_this, _this);

      switch (type) {
        case 'marker':
          _this.startDrawingMarker({
            callback: function (position) {
              _this.executeListeners({ name: 'markerCreated', position: position });
            }
          })
          _this.addListener('markerCreated', function (event) {
            let b = new Cesium.BillboardCollection();
            let guid = createGUID();
            let primitiveItem = DrawHelper.scene.primitives.add(b);
            let billboard = b.add({
              id: {
                uid: guid,
                type: 'marker',
                text: '双击编辑',
                font: '14px sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK
              },
              show: true,
              position: event.position,
              pixelOffset: new Cesium.Cartesian2(0, 0),
              eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.CENTER,
              scale: 1.0,
              image: locationIcon,
              color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
            });
            billboard.setEditable();

            let l = new Cesium.LabelCollection();
            let labelPrimitive = DrawHelper.scene.primitives.add(l);
            let label = l.add({
              id: {
                uid: guid,
                type: 'label',
                text: '',
                font: '14px sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK
              },
              show: true,
              position: event.position,
              text: '双击编辑',
              font: '14px sans-serif',
              scale: 1.0,
              pixelOffset: new Cesium.Cartesian2(0, 25),
              eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
              showBackground: false,
              backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.CENTER,
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK
            });
            label.setEditable();

            DrawHelper.primitivesManager.marker.push(primitiveItem);
            DrawHelper.primitivesManager.makerLabel.push(labelPrimitive);
            DrawHelper.primitivesManager.allPrimitives.push(primitiveItem);
            DrawHelper.primitivesManager.allPrimitives.push(labelPrimitive);
            if (typeof callback === 'function')
              callback()
          })
          break;
        case 'polyline':
          _this.startDrawingPolyline({
            callback: function (positions) {
              _this.executeListeners({ name: 'polylineCreated', positions: positions })
            }
          })
          _this.addListener('polylineCreated', function (event) {
            let uid = createGUID();
            let polyline = new DrawHelper.PolylinePrimitive({
              positions: event.positions,
              width: 5,
              geodesic: true
            });
            let primitiveItem = DrawHelper.scene.primitives.add(polyline);
            polyline.setEditable();
            DrawHelper.primitivesManager.polyline.push(polyline);
            DrawHelper.primitivesManager.allPrimitives.push(polyline);
            if (typeof callback === 'function') {
              callback();
            }
          })
          break;
        case 'polygon':
          _this.startDrawingPolygon({
            callback: function (positions) {
              _this.executeListeners({ name: 'polygonCreated', positions: positions });
            }
          });
          _this.addListener('polygonCreated', function (event) {
            let polygon = new DrawHelper.PolygonPrimitive({
              positions: event.positions
            });
            var primitiveItem = DrawHelper.scene.primitives.add(polygon);
            DrawHelper.primitivesManager.polygon.push(polygon);
            DrawHelper.primitivesManager.allPrimitives.push(polygon);
            polygon.setEditable();
            if (typeof callback === 'function')
              callback()
          });
          break;
        case 'cleanUp':
          if (DrawHelper.primitivesManager.allPrimitives.length <= 0) {
            alert('没有可供清除的标绘元素');
          } else {
            for (let i in DrawHelper.primitivesManager.allPrimitives) {
              DrawHelper.scene.primitives.remove(DrawHelper.primitivesManager.allPrimitives[i]);
            }
            DrawHelper.primitivesManager.allPrimitives = [];
          }
          break;
        case 'export':

          break;
        default:
          break;
      }
    }

    static registerEditableShape(surface) {
      // let _this = this;
      setListener(surface, 'mouseMove', function (position) {
        surface.setHighlighted(true);
        if (!surface._editMode) {
          DrawHelper.tooltip.showAt(position, "点击编辑图形");
        }
      });
      setListener(surface, 'mouseOut', function (position) {
        surface.setHighlighted(false);
        DrawHelper.tooltip.setVisible(false);
      });
      setListener(surface, 'leftClick', function (position) {
        surface.setEditMode(true);
      });
      setListener(surface, 'leftDoubleClick', function (position) {

      });
    }

    static setEditMode(editMode) {
      if (this._editMode == editMode) {
        return;
      }
      DrawHelper.disableAllHighlights();
      if (editMode) {
        DrawHelper.setEdited(this);
        let _this = this;
        if (_this._markers == null) {
          let markers = new DrawHelper.BillboardGroup(_this, dragBillboard);
          let editMarkers = new DrawHelper.BillboardGroup(_this, dragHalfBillboard);

          function calculateHalfMarkerPosition(index) {
            var positions = _this.positions;
            return _this.ellipsoid.cartographicToCartesian(
              new Cesium.EllipsoidGeodesic(_this.ellipsoid.cartesianToCartographic(positions[index]),
                _this.ellipsoid.cartesianToCartographic(positions[index < positions.length - 1 ? index + 1 : 0])).interpolateUsingFraction(0.5)
            );
          }

          function updateHalfMarkers(index, positions) {
            let editIndex = index - 1 < 0 ? positions.length - 1 : index - 1;
            if (editIndex < editMarkers.countBillboards()) {
              editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
            }
            editIndex = index;
            if (editIndex < editMarkers.countBillboards()) {
              editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
            }
          }

          function onEdited() {
            _this.executeListeners({ name: 'onEdited', positions: _this.positions });
          }

          let handleMarkerChanges = {
            dragHandlers: {
              onDrag: function (index, position) {
                _this.positions[index] = position;
                updateHalfMarkers(index, _this.positions);
                _this._createPrimitive = true;
                // onEdited();
              },
              onDragEnd: function (index, position) {
                _this._createPrimitive = true;
                // onEdited();
              }
            },
            onDoubleClick: function (index) {
              if (_this.positions.length < 4) {
                return;
              }
              _this.positions.splice(index, 1);
              _this._createPrimitive = true;
              markers.removeBillboard(index);
              editMarkers.removeBillboard(index);
              updateHalfMarkers(index, _this.positions);
            },
            tooltip: function () {
              if (_this.positions.length > 3) {
                return "<p>双击：移除该点</p><p>左击：拾取点位以拖拽编辑</p><p>右击：完成拖拽编辑</p>";
              }
            }
          };
          markers.addBillboards(_this.positions, handleMarkerChanges);
          this._markers = markers;

          let halfPositions = [];
          let index = 0;
          let length = _this.positions.length + (_this.isPolygon ? 0 : -1);
          for (; index < length; index++) {
            halfPositions.push(calculateHalfMarkerPosition(index));
          }

          let handleEditMarkerChanges = {
            dragHandlers: {
              onDragStart: function (index, position) {
                // add a new position to the polygon but not a new marker yet
                _this.index = index + 1;
                _this.positions.splice(_this.index, 0, position);
                _this._createPrimitive = true;
              },
              onDrag: function (index, position) {
                _this.positions[_this.index] = position;
                _this._createPrimitive = true;
              },
              onDragEnd: function (index, position) {
                // create new sets of makers for editing
                markers.insertBillboard(_this.index, position, handleMarkerChanges);
                editMarkers.getBillboard(_this.index - 1).position = calculateHalfMarkerPosition(_this.index - 1);
                editMarkers.insertBillboard(_this.index, calculateHalfMarkerPosition(_this.index), handleEditMarkerChanges);
                _this._createPrimitive = true;
                // onEdited();
              }
            },
            tooltip: function () {
              return "点击拖动添加一个新的点";
            }
          };
          editMarkers.addBillboards(halfPositions, handleEditMarkerChanges);
          _this._editMarkers = editMarkers;
          _this._globeClickhandler = new Cesium.ScreenSpaceEventHandler(_this.canvas);
          _this._globeClickhandler.setInputAction(
            function (movement) {
              let pickedObject = DrawHelper.scene.pick(movement.position);
              if (!(pickedObject && pickedObject.primitive)) {
                _this.setEditMode(false);
              }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
          markers.setOnTop();
          editMarkers.setOnTop();
        }
        _this._editMode = true;
      } else {
        let _this = this;
        if (_this._markers != null) {
          _this._markers.remove();
          _this._editMarkers.remove();
          _this._markers = null;
          _this._editMarkers = null;
          _this._globeClickhandler.destroy();
        }
        _this._editMode = false;
      }
    }
  }
  return DrawHelper;
})()

/**
 * 为DrawHelper类添加方法
 */
Object.assign(DrawHelper.prototype, {
  initialiseHandlers(){
    let scene = DrawHelper.scene;
    let _this = this;
    let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

    function callPrimitiveCallback(name, position) {
      if (_this._handlersMuted === true) return;
      let pickedObject = scene.pick(position);
      if (pickedObject && pickedObject.primitive && pickedObject.primitive[name]) {
        pickedObject.primitive[name](position);
      }
    }

    handler.setInputAction(
      function (movement) {
        callPrimitiveCallback('leftClick', movement.position);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction(
      function (movement) {
        callPrimitiveCallback('leftDoubleClick', movement.position);
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    let mouseOutObject;
    handler.setInputAction(
      function (movement) {
        if (_this._handlersMuted == true) return;
        let pickedObject = scene.pick(movement.endPosition);
        if (mouseOutObject && (!pickedObject || mouseOutObject != pickedObject.primitive)) {
          !(mouseOutObject.isDestroyed && mouseOutObject.isDestroyed()) && mouseOutObject.mouseOut(movement.endPosition);
          mouseOutObject = null;
        }
        if (pickedObject && pickedObject.primitive) {
          pickedObject = pickedObject.primitive;
          if (pickedObject.mouseOut) {
            mouseOutObject = pickedObject;
          }
          if (pickedObject.mouseMove) {
            pickedObject.mouseMove(movement.endPosition);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(
      function (movement) {
        callPrimitiveCallback('leftUp', movement.position);
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
    handler.setInputAction(
      function (movement) {
        callPrimitiveCallback('leftDown', movement.position);
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
  },

  enhancePrimitives(){
    let _this = this;
    Cesium.Billboard.prototype.setEditable = function () {

      if (this._editable) {
        return;
      }
      this._editable = true;
      let billboard = this;
      function enableRotation(enable) {
        DrawHelper.scene.screenSpaceCameraController.enableRotate = enable;
      }
      let handler = new Cesium.ScreenSpaceEventHandler(DrawHelper.scene.canvas);
      function onDrag(position) {
        billboard.position = position;
        for (let i = 0; i < DrawHelper.scene.primitives.length; i++){
          let p = DrawHelper.scene.primitives.get(i)
          let str = p.constructor + ''
          let start = str.replace("function", "|").indexOf('|')
          let p_type_name = ''
          if (start != -1) {
            let end = str.replace("function", "|").indexOf("(")
            if (end != -1) {
              p_type_name = str.replace("function", "|").slice(start + 2, end);
            }
          }
          if (p_type_name === 'LabelCollection' && p._labels.length > 0 && p._labels[0]._id && p._labels[0]._id.type === 'label' && p._labels[0]._id.uid === billboard._id.uid) {
            p._labels[0].position = position
          }
        }
      }

      function onDragEnd() {
        // 允许鼠标拖拽旋转地球
        DrawHelper.scene.screenSpaceCameraController.enableTranslate = true;
        handler.destroy();
        enableRotation(true);
      }
      setListener(billboard, 'leftDown', function (position) {
        if (handler.isDestroyed())
          handler = new Cesium.ScreenSpaceEventHandler(DrawHelper.scene.canvas);
        // 禁止鼠标拖拽旋转地球
        DrawHelper.scene.screenSpaceCameraController.enableTranslate = false;
        if (handler.isDestroyed())
          handler = new Cesium.ScreenSpaceEventHandler(DrawHelper.scene.canvas);
        handler.setInputAction(function (movement) {
          var cartesian = DrawHelper.scene.camera.pickEllipsoid(movement.endPosition, DrawHelper.ellipsoid);
          if (cartesian) {
            onDrag(cartesian);
          } else {
            onDragEnd();
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        enableRotation(false);
      });
      setListener(billboard, 'leftUp', function (position) {
        onDragEnd();
      });
      enhanceWithListeners(billboard, _this);
    }
    Cesium.Label.prototype.setEditable = function () {
      if (this._editable) {
        return;
      }
      this._editable = true;
      let label = this;
      setListener(label, 'leftDoubleClick', function () {
        alert('文字编辑功能暂未开放')
      })
    }
    function setHighlighted(highlighted) {
      let scene = DrawHelper.scene;
      // if no change
      // if already highlighted, the outline polygon will be available
      if (this._highlighted && this._highlighted == highlighted) {
        return;
      }
      // disable if already in edit mode
      if (this._editMode === true) {
        return;
      }
      this._highlighted = highlighted;
      // highlight by creating an outline polygon matching the polygon points
      if (highlighted) {
        // make sure all other shapes are not highlighted
        DrawHelper.setHighlighted(this);
        this._strokeColor = this.strokeColor;
        this.setStrokeStyle(Cesium.Color.fromCssColorString('white'), this.strokeWidth);
      } else {
        if (this._strokeColor) {
          this.setStrokeStyle(this._strokeColor, this.strokeWidth);
        } else {
          this.setStrokeStyle(undefined, undefined);
        }
      }
    }
  },

  // 导出标绘结果
  exportDrawResult(type, callback){
    let ellipsoid = DrawHelper.scene.globe.ellipsoid;    //得到当前三维场景的椭球体
    let jsonObj = [];
    let markerArr = [];
    let markerText = '';
    let markerFillColor = '';
    let markerOutlineColor = '';
    let markerImgUrl = '';
    let markerUid = '';
    let markerFont = '';
    let lineArr = []
    let lineStyle = ''
    let lineTextStyle = ''
    let polygonArr = []
    let polygonStyle = []
    let polygonTextStyle = ''
    if (DrawHelper.primitivesManager.allPrimitives.length <= 0) {
      alert('没有可供导出的标绘结果');
      return;
    }
    function toGeojson(exportType, callback) {
      // earthCommon.request(DrawHelper.options.baseUrl, {
      //   url: '/main/toGeojson',
      //   type: 'POST',
      //   dataType: 'json',
      //   data: JSON.stringify(jsonObj),
      //   contentType: 'application/json',
      //   beforeSend: function (xhr) {
      //     xhr.setRequestHeader("Authorization", earthCommon.getCookie('sessionId'));
      //   },
      //   success: function (res, statusTest, xhr) {
      //     if (exportType === 'saveLayer') {
      //       var url = DrawHelper.options.baseUrl + '/main/downloadShapFiles';
      //       $("#exportForm").attr('action', url);
      //       $("#geojsonData").val(JSON.stringify(res));
      //       console.log($("#exportForm").attr('action'));
      //       console.log($("#geojsonData"));
      //       $("#exportForm").submit();
      //     } else if (exportType === 'getJson') {
      //       callback(jsonObj)
      //     }
      //   },
      //   error: function (xhr, err, obj) {
      //     if (xhr.status === 401) {
      //       earthCommon.setCookie('sessionId', '', 7)
      //       DrawHelper.getPermissions(toGeojson)
      //     }
      //   }
      // });
    }
    for (let i = 0; i < DrawHelper.primitivesManager.allPrimitives.length; i++) {
      let p = DrawHelper.primitivesManager.allPrimitives[i];
      var str = p.constructor + ''
      var start = str.replace("function", "|").indexOf('|')
      var p_type_name = ''
      if (start != -1) {
        var end = str.replace("function", "|").indexOf("(")
        if (end != -1) {
          p_type_name = str.replace("function", "|").slice(start + 2, end);
        }
      }
      if (p_type_name == 'BillboardCollection') {
        if (p._billboards[0] && p._billboards[0]._id && p._billboards[0]._id.type && p._billboards[0]._id.type === "marker") {
          let cartographic = ellipsoid.cartesianToCartographic(p._billboards[0]._position);
          let lat = Cesium.Math.toDegrees(cartographic.latitude);
          let lng = Cesium.Math.toDegrees(cartographic.longitude);
          markerArr.push([lng, lat]);
          // 点位样式
          markerText += p._billboards[0]._id.text + ';'
          markerFont += p._billboards[0]._id.font + ';'
          markerFillColor += p._billboards[0]._id.fillColor + ';'
          markerOutlineColor += p._billboards[0]._id.outlineColor + ';'
          markerImgUrl += p._billboards[0]._imageId + ';'
          markerUid += p._billboards[0]._id.uid + ';'
        }
      }
      // 获取地图上的线和面图层信息
      if (p.primitiveType) {
        let poiArray = [];
        switch (p.primitiveType) {
          case 'polyline':
            console.log(p)
            poiArray = [];
            for (let j = 0; j < p.positions.length; j++) {
              let cartographic = ellipsoid.cartesianToCartographic(p.positions[j]);
              let lat = Cesium.Math.toDegrees(cartographic.latitude);
              let lng = Cesium.Math.toDegrees(cartographic.longitude);
              poiArray.push([lng, lat]);
            }
            lineArr.push(poiArray);
            lineStyle += '{"color": {"blue": \"' + p.material.uniforms.color.blue + '\", "green": \"' + p.material.uniforms.color.green + '\", "red": \"' + p.material.uniforms.color.red + '\", "alpha": \"' + p.material.uniforms.color.alpha + '\"}};'
            // lineTextStyle += JSON.stringify(p.st.text) + ';';
            break;
          case 'polygon':
            // case 'extent':
            poiArray = [];
            for (let j = 0; j < p.positions.length; j++) {
              let cartographic = ellipsoid.cartesianToCartographic(p.positions[j]);
              let lat = Cesium.Math.toDegrees(cartographic.latitude);
              let lng = Cesium.Math.toDegrees(cartographic.longitude);
              poiArray.push([lng, lat]);
            }
            let cartographic_1 = ellipsoid.cartesianToCartographic(p.positions[0]);
            let lat_1 = Cesium.Math.toDegrees(cartographic_1.latitude);
            let lng_1 = Cesium.Math.toDegrees(cartographic_1.longitude);
            poiArray.push([lng_1, lat_1])
            polygonArr.push([poiArray]);
            polygonStyle += '{"color": {"blue": \"' + p.material.uniforms.color.blue + '\", "green": \"' + p.material.uniforms.color.green + '\", "red": \"' + p.material.uniforms.color.red + '\", "alpha": \"' + p.material.uniforms.color.alpha + '\"}};'
            // polygonTextStyle += JSON.stringify(p.st.text) + ';';
            break;
          // case 'extent':
          //     break;
          // case 'ellipse':
          //     break;
          // case 'circle':
          //     break;
          default:
            break;
        }
      }
    }
    // 单点标注图层
    if (markerArr.length === 1) {
      let uuid = createGUID()
      let st = {
        imgurl: markerImgUrl.substring(0, markerImgUrl.length - 1),
        uid: markerUid.substring(0, markerUid.length - 1),
        text: markerText.substring(0, markerText.length - 1),
        fillcolor: markerFillColor.substring(0, markerFillColor.length - 1),
        outlinecolor: markerOutlineColor.substring(0, markerOutlineColor.length - 1),
        font: markerFont.substring(0, markerOutlineColor.length - 1)
      }
      jsonObj.push({"type": "Point", "coordinates": markerArr, "styleId": uuid, "st": st});
    }
    // 多点标注图层
    if (markerArr.length > 1) {
      let uuid = createGUID()
      let st = {
        imgurl: markerImgUrl.substring(0, markerImgUrl.length - 1),
        uid: markerUid.substring(0, markerUid.length - 1),
        text: markerText.substring(0, markerText.length - 1),
        fillcolor: markerFillColor.substring(0, markerFillColor.length - 1),
        outlinecolor: markerOutlineColor.substring(0, markerOutlineColor.length - 1),
        font: markerFont.substring(0, markerFont.length - 1)
      }
      jsonObj.push({"type": "MultiPoint", "coordinates": markerArr, "styleId": uuid, "st": st});
    }
    // 单线标注图层
    if (lineArr.length == 1) {
      let uuid = createGUID()
      let st = {
        fillcolor: lineStyle.substring(0, lineStyle.length - 1),
        text: lineTextStyle.substring(0, lineTextStyle.length - 1)
      }
      jsonObj.push({"type": "LineString", "coordinates": lineArr, "styleId": uuid, "st": st});
    }
    // 多线标注图层
    if (lineArr.length > 1) {
      let uuid = createGUID()
      let st = {
        fillcolor: lineStyle.substring(0, lineStyle.length - 1),
        text: lineTextStyle.substring(0, lineTextStyle.length - 1)
      }
      jsonObj.push({"type": "MultiLineString", "coordinates": lineArr, "styleId": uuid, "st": st});
    }
    // 单面标注图层
    if (polygonArr.length == 1) {
      let uuid = createGUID()
      let st = {
        fillcolor: polygonStyle.substring(0, polygonStyle.length - 1),
        text: polygonTextStyle.substring(0, polygonTextStyle.length - 1)
      }
      jsonObj.push({"type": "Polygon", "coordinates": polygonArr, "styleId": uuid, "st": st});
    }
    // 多面标注图层
    if (polygonArr.length > 1) {
      let uuid = createGUID()
      let st = {
        fillcolor: polygonStyle.substring(0, polygonStyle.length - 1),
        text: polygonTextStyle.substring(0, polygonTextStyle.length - 1)
      }
      jsonObj.push({"type": "MultiPolygon", "coordinates": polygonArr, "styleId": uuid, "st": st});
    }
    if (jsonObj.length != 0) {
      toGeojson(type, callback)
    }
  },

  importLayerByGeoJson(type, coordinates, sid) {
    if (sid) {
      // earthCommon.request(DrawHelper.options.baseUrl, {
      //   url: '/main/getStyle?id=' + sid,
      //   type: "GET",
      //   success: function (res, statusTest, xhr) {
      //     // 单个点
      //     if (type === "Point") {
      //       console.log(res.result);
      //       let uid = res.result.uid.split(';');
      //       let text = res.result.text.split(';');
      //       let fillColor = res.result.fillcolor.split(';');
      //       let outlineColor = res.result.outlinecolor.split(';');
      //       let font = res.result.font.split(';');
      //       let imgUrl = res.result.imgurl;
      //       let b = new Cesium.BillboardCollection();
      //       let billboardPrimitive = DrawHelper.viewer.scene.primitives.add(b);
      //       let billboard = b.add({
      //         id: {
      //           uid: uid[0],
      //           type: 'marker',
      //           text: text[0],
      //           font: font[0],
      //           fillColor: fillColor[0],
      //           outlineColor: outlineColor[0]
      //         },
      //         show: true,
      //         position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]),
      //         pixelOffset: new Cesium.Cartesian2(0, 0),
      //         eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
      //         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      //         verticalOrigin: Cesium.VerticalOrigin.CENTER,
      //         scale: 1.0,
      //         image: locationIcon,
      //         color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
      //       });
      //       let l = new Cesium.LabelCollection();
      //       let labelPrimitive = DrawHelper.viewer.scene.primitives.add(l);
      //       let label = l.add({
      //         id: {
      //           uid: uid[0],
      //           type: 'label',
      //           text: text[0] === '' ? '双击编辑' : text[0],
      //           font: font[0],
      //           fillColor: fillColor[0],
      //           outlineColor: outlineColor[0]
      //         },
      //         show: true,
      //         position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]),
      //         text: text[0] === '' ? '双击编辑' : text[0],
      //         font: font[0] === '' ? '14px sans-serif' : font[0],
      //         scale: 1.0,
      //         pixelOffset: new Cesium.Cartesian2(0, 25),
      //         eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
      //         showBackground: false,
      //         backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),
      //         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      //         verticalOrigin: Cesium.VerticalOrigin.CENTER,
      //         fillColor: fillColor[0] === '' ? Cesium.Color.WHITE : (fillColor[0].alpha ? new Cesium.Color(fillColor[0].red, fillColor[0].green, fillColor[0].blue, fillColor[0].alpha) : new Cesium.Color.fromCssColorString(fillColor[0])),
      //         outlineColor: outlineColor[0] === '' ? Cesium.Color.WHITE : (outlineColor[0].alpha ? new Cesium.Color(outlineColor[0].red, outlineColor[0].green, outlineColor[0].blue, outlineColor[0].alpha) : new Cesium.Color.fromCssColorString(outlineColor[0]))
      //       })
      //       billboard.setEditable();
      //       label.setEditable();
      //       DrawHelper.primitivesManager.marker.push(billboardPrimitive);
      //       DrawHelper.primitivesManager.makerLabel.push(labelPrimitive);
      //       DrawHelper.primitivesManager.allPrimitives.push(billboardPrimitive);
      //       DrawHelper.primitivesManager.allPrimitives.push(labelPrimitive);
      //     }
      //     // 多个点
      //     if (type === "MultiPoint") {
      //       let uid = res.result.uid.split(';');
      //       let text = res.result.text.split(';');
      //       let fillColor = res.result.fillcolor.split(';');
      //       let outlineColor = res.result.outlinecolor.split(';');
      //       let font = res.result.font.split(';');
      //       let imgUrl = res.result.imgurl;
      //       for (let j in coordinates) {
      //         let b = new Cesium.BillboardCollection();
      //         let billboardPrimitive = DrawHelper.viewer.scene.primitives.add(b);
      //         let billboard = b.add({
      //           id: {
      //             uid: uid[j],
      //             type: 'marker',
      //             text: text[j],
      //             font: font[j],
      //             fillColor: fillColor[j],
      //             outlineColor: outlineColor[j]
      //           },
      //           show: true,
      //           position: Cesium.Cartesian3.fromDegrees(coordinates[j][0], coordinates[j][1]),
      //           pixelOffset: new Cesium.Cartesian2(0, 0),
      //           eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
      //           horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      //           verticalOrigin: Cesium.VerticalOrigin.CENTER,
      //           scale: 1.0,
      //           image: locationIcon,
      //           color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
      //         })
      //         let l = new Cesium.LabelCollection()
      //         let labelPrimitive = DrawHelper.viewer.scene.primitives.add(l);
      //         let label = l.add({
      //           id: {
      //             uid: uid[j],
      //             type: 'label',
      //             text: text[j] === '' ? '双击编辑' : text[j],
      //             font: font[j],
      //             fillColor: fillColor[j],
      //             outlineColor: outlineColor[j]
      //           },
      //           show: true,
      //           position: Cesium.Cartesian3.fromDegrees(coordinates[j][0], coordinates[j][1]),
      //           text: text[j],
      //           font: font[j],
      //           scale: 1.0,
      //           pixelOffset: new Cesium.Cartesian2(0, 25),
      //           eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
      //           showBackground: false,
      //           backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),
      //           horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      //           verticalOrigin: Cesium.VerticalOrigin.CENTER,
      //           fillColor: fillColor[j] === '' ? Cesium.Color.WHITE : (fillColor[j].alpha ? new Cesium.Color(fillColor[j].red, fillColor[j].green, fillColor[j].blue, fillColor[j].alpha) : new Cesium.Color.fromCssColorString(fillColor[j])),
      //           outlineColor: outlineColor[j] === '' ? Cesium.Color.WHITE : (outlineColor[j].alpha ? new Cesium.Color(outlineColor[j].red, outlineColor[j].green, outlineColor[j].blue, outlineColor[j].alpha) : new Cesium.Color.fromCssColorString(outlineColor[j]))
      //         })
      //         billboard.setEditable();
      //         label.setEditable();
      //         DrawHelper.primitivesManager.marker.push(billboardPrimitive);
      //         DrawHelper.primitivesManager.makerLabel.push(labelPrimitive);
      //         DrawHelper.primitivesManager.allPrimitives.push(billboardPrimitive);
      //         DrawHelper.primitivesManager.allPrimitives.push(labelPrimitive);
      //       }
      //     }
      //     // 线
      //     if (type === "MultiLineString") {
      //       for (let k in coordinates) {
      //         let poly = null;
      //         poly = new DrawHelper.PolylinePrimitive({
      //           callback: function () {}
      //         });
      //         poly.primitiveType = 'polyline';
      //         poly.asynchronous = false;
      //         DrawHelper.viewer.scene.primitives.add(poly);
      //         let positions = [];
      //         for (let j in coordinates[k]) {
      //           let cartesian = Cesium.Cartesian3.fromDegrees(coordinates[k][j][0], coordinates[k][j][1])
      //           if (cartesian) {
      //             positions.push(cartesian);
      //           }
      //         }
      //         poly.positions = positions;
      //         poly._createPrimitive = true;
      //         poly.setEditable();
      //         DrawHelper.primitivesManager.polyline.push(poly);
      //         DrawHelper.primitivesManager.allPrimitives.push(poly);
      //       }
      //     }
      //     // 面
      //     if (type === "MultiPolygon") {
      //       for (let k in coordinates) {
      //         let poly = null;
      //         poly = new DrawHelper.PolygonPrimitive({
      //           callback: function () {
      //           }
      //         });
      //         poly.primitiveType = 'polygon';
      //         poly.asynchronous = false;
      //         DrawHelper.viewer.scene.primitives.add(poly);
      //         let positions = [];
      //         for (let j in coordinates[k][0]) {
      //           let cartesian = Cesium.Cartesian3.fromDegrees(coordinates[k][0][j][0], coordinates[k][0][j][1])
      //           if (cartesian && j != coordinates[k][0].length - 1) {
      //             positions.push(cartesian)
      //           }
      //         }
      //         poly.positions = positions;
      //         poly._createPrimitive = true;
      //         poly.setEditable();
      //         DrawHelper.primitivesManager.polygon.push(poly);
      //         DrawHelper.primitivesManager.allPrimitives.push(poly);
      //       }
      //     }
      //   }
      // });
    }
  },

  importShapFile() {
    let _this = this;
    let ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
    if (ie) {
      document.getElementById("geojsonFile").click();
    } else {
      let a = document.createEvent("MouseEvents");//FF的处理
      a.initEvent("click", true, true);
      document.getElementById("geojsonFile").dispatchEvent(a);
    }
    function uploadShapFiles() {
      let form = new FormData(document.getElementById("importForm"));
      let sessionId = earthCommon.getCookie("sessionId");
      // earthCommon.request(DrawHelper.options.baseUrl, {
      //   url: '/main/uploadShapFiles',
      //   type: "POST",
      //   data: form,
      //   cache: false,
      //   processData: false,
      //   contentType: false,
      //   beforeSend: function (xhr) {
      //     xhr.setRequestHeader("Authorization", earthCommon.getCookie('sessionId'));
      //   },
      //   success: function (res, statusTest, xhr) {
      //     for (let i = 0; i < res.content.length; i++) {
      //       earthCommon.request(DrawHelper.options.baseUrl, {
      //         url: res.content[i],
      //         type: "GET",
      //         success: function (res, statusTest, xhr) {
      //           let features = JSON.parse(res).features;
      //           for (let i in features) {
      //             _this.importLayerByGeoJson(features[i].geometry.type, features[i].geometry.coordinates, features[i].properties.sid);
      //           }
      //         },
      //         error: function (xhr, err, obj) {
      //           window.alert(err)
      //         }
      //       });
      //     }
      //     $('#geojsonFile').val('')
      //   },
      //   error: function (xhr, err, obj) {
      //     if (xhr.status === 401) {
      //       earthCommon.setCookie('sessionId', '', 7)
      //       DrawHelper.getPermissions(uploadShapFiles)
      //     }
      //   }
      // });
    }
    $('#geojsonFile').change(function () {
      if ($('#geojsonFile').val != '')
        uploadShapFiles()
      $('#geojsonFile').off("change")
    });
  }
});
// 线、面基础类
DrawHelper.ChangeablePrimitive = class {
  constructor(){}
  initialiseOptions(options) {

    earthCommon.fillOptions(this, options);
    this._ellipsoid = undefined;
    this._granularity = undefined;
    this._height = undefined;
    this._textureRotationAngle = undefined;
    this._id = undefined;

    this._createPrimitive = true;
    this._primitive = undefined;
    this._outlinePolygon = undefined;
  }
  setAttribute(name, value) {
    this[name] = value;
    this._createPrimitive = true;
  }
  getAttribute(name) {
    return this[name];
  }
  update(context, frameState, commandList) {
    if (!Cesium.defined(this.ellipsoid)) {
      throw new Cesium.DeveloperError('this.ellipsoid must be defined.');
    }
    if (!Cesium.defined(this.appearance)) {
      throw new Cesium.DeveloperError('this.material must be defined.');
    }

    if (this.granularity < 0.0) {
      throw new Cesium.DeveloperError('this.granularity and scene2D/scene3D overrides must be greater than zero.');
    }

    if (!this.show) {
      return;
    }

    if (!this._createPrimitive && (!Cesium.defined(this._primitive))) {

      return;
    }
    if (this._createPrimitive ||
      (this._ellipsoid !== this.ellipsoid) ||
      (this._granularity !== this.granularity) ||
      (this._height !== this.height) ||
      (this._textureRotationAngle !== this.textureRotationAngle) ||
      (this._id !== this.id)) {

      var geometry = this.getGeometry();
      if (!geometry) {
        return;
      }

      this._createPrimitive = false;
      this._ellipsoid = this.ellipsoid;
      this._granularity = this.granularity;
      this._height = this.height;
      this._textureRotationAngle = this.textureRotationAngle;
      this._id = this.id;

      this._primitive = this._primitive && this._primitive.destroy();

      this._primitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: geometry,
          id: this.id,
          pickPrimitive: this
        }),
        appearance: this.appearance,
        asynchronous: this.asynchronous
      });

      this._outlinePolygon = this._outlinePolygon && this._outlinePolygon.destroy();
      if (this.strokeColor && this.getOutlineGeometry) {
        // create the highlighting frame
        this._outlinePolygon = new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: this.getOutlineGeometry(),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(this.strokeColor)
            }
          }),
          appearance: new Cesium.PerInstanceColorAppearance({
            flat: true,
            renderState: {
              depthTest: {
                enabled: true
              },
              //lineWidth : Math.min(this.strokeWidth || 4.0, context._aliasedLineWidthRange[1])
              lineWidth: Math.min(this.strokeWidth)
            }
          })
        });
      }
    }

    var primitive = this._primitive;
    primitive.appearance.material = this.material;
    primitive.debugShowBoundingVolume = this.debugShowBoundingVolume;
    primitive.update(context, frameState, commandList);
    this._outlinePolygon && this._outlinePolygon.update(context, frameState, commandList);
  }
  isDestroyed() {
    return false;
  };

  destroy() {
    this._primitive = this._primitive && this._primitive.destroy();
    return Cesium.destroyObject(this);
  };
  setStrokeStyle(strokeColor, strokeWidth) {
    if (!this.strokeColor || !this.strokeColor.equals(strokeColor) || this.strokeWidth != strokeWidth) {
      this._createPrimitive = true;
      this.strokeColor = strokeColor;
      this.strokeWidth = strokeWidth;
    }
  }
}
// 点位标注基础类
DrawHelper.BillboardGroup = class {
  constructor(options) {
    this._drawHelper = DrawHelper;
    this._scene = DrawHelper.scene;
    this._options = earthCommon.copyOptions(options, defaultBillboard);
    let b = new Cesium.BillboardCollection();
    this._scene.primitives.add(b);
    this._billboards = b;
    this._orderedBillboards = [];
  }
  createBillboard(position, callbacks) {
    var _this = this;
    let billboard = _this._billboards.add({
      show: true,
      position: position,
      pixelOffset: new Cesium.Cartesian2(_this._options.shiftX, _this._options.shiftY),
      eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      scale: 1.0,
      image: _this._options.iconUrl,
      color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
      id: new Date().getTime() + 'drawPoint'
    })
    if (callbacks) {
      let _this = this;
      let screenSpaceCameraController = DrawHelper.scene.screenSpaceCameraController;

      function enableRotation(enable) {
        screenSpaceCameraController.enableRotate = enable;
      }

      function getIndex() {
        for (var i = 0, I = _this._orderedBillboards.length; i < I && _this._orderedBillboards[i] != billboard; ++i);
          return i;
      }
      if (callbacks.dragHandlers) {
        let handler = new Cesium.ScreenSpaceEventHandler(DrawHelper.scene.canvas);
        function onDrag(position) {
          billboard.position = position;
          for (var i = 0, I = _this._orderedBillboards.length; i < I && _this._orderedBillboards[i] != billboard; ++i);
          callbacks.dragHandlers.onDrag && callbacks.dragHandlers.onDrag(getIndex(), position);
        }

        function onDragEnd(position) {
          // 允许鼠标拖拽旋转地球
          DrawHelper.scene.screenSpaceCameraController.enableTranslate = true;
          handler.destroy();
          enableRotation(true);
          callbacks.dragHandlers.onDragEnd && callbacks.dragHandlers.onDragEnd(getIndex(), position);
        }
        setListener(billboard, 'leftDown', function (position) {
          // 禁止鼠标拖拽旋转地球
          DrawHelper.scene.screenSpaceCameraController.enableTranslate = false;
          if (handler.isDestroyed())
            handler = new Cesium.ScreenSpaceEventHandler(DrawHelper.scene.canvas);
          handler.setInputAction(function (movement) {
            var cartesian = DrawHelper.scene.camera.pickEllipsoid(movement.endPosition, DrawHelper.ellipsoid);
            if (cartesian) {
              onDrag(cartesian);
            } else {
              onDragEnd(cartesian);
            }
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

          handler.setInputAction(function (movement) {
            onDragEnd(DrawHelper.scene.camera.pickEllipsoid(movement.position, DrawHelper.ellipsoid));
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

          enableRotation(false);
          callbacks.dragHandlers.onDragStart && callbacks.dragHandlers.onDragStart(getIndex(), DrawHelper.scene.camera.pickEllipsoid(position, DrawHelper.ellipsoid));
        });
      }
      if (callbacks.onDoubleClick) {
        setListener(billboard, 'leftDoubleClick', function (position) {
          callbacks.onDoubleClick(getIndex());
        });
      }
      if (callbacks.onClick) {
        setListener(billboard, 'leftClick', function (position) {
          callbacks.onClick(getIndex());
        });
      }
      if (callbacks.tooltip) {
        setListener(billboard, 'mouseMove', function (position) {
          DrawHelper.tooltip.showAt(new Cesium.Cartesian2(position.x, position.y), callbacks.tooltip());
        });
        setListener(billboard, 'mouseOut', function (position) {
          DrawHelper.tooltip.setVisible(false);
        });
      }
    }
    return billboard;
  }
  insertBillboard(index, position, callbacks) {
    this._orderedBillboards.splice(index, 0, this.createBillboard(position, callbacks));
  }
  addBillboard(position, callbacks) {
    this._orderedBillboards.push(this.createBillboard(position, callbacks));
  }
  addBillboards(positions, callbacks) {
    let index = 0;
    for (; index < positions.length; index++) {
      this.addBillboard(positions[index], callbacks);
    }
  }
  updateBillboardsPositions(positions) {
    var index = 0;
    for (; index < positions.length; index++) {
      this.getBillboard(index).position = positions[index];
    }
  }
  countBillboards() {
    return this._orderedBillboards.length;
  }
  getBillboard(index) {
    return this._orderedBillboards[index];
  }
  removeBillboard(index) {
    this._billboards.remove(this.getBillboard(index));
    this._orderedBillboards.splice(index, 1);
  }
  remove() {
    this._billboards = this._billboards && this._billboards.removeAll() && this._billboards.destroy();
  }
  setOnTop() {
    this._scene.primitives.raiseToTop(this._billboards);
  }
}
DrawHelper.PolylinePrimitive = class extends DrawHelper.ChangeablePrimitive {
  constructor(options) {
    super();
    options = earthCommon.copyOptions(options, defaultPolylineOptions);
    super.initialiseOptions(options);
  }
  setPositions(positions) {
    super.setAttribute('positions', positions);
  }
  setWidth(width) {
    super.setAttribute('width', width);
  }
  setGeodesic(geodesic) {
    super.setAttribute('geodesic', geodesic);
  }
  getPositions() {
    return super.getAttribute('positions');
  }
  getWidth() {
    return super.getAttribute('width');
  }
  getGeodesic() {
    return super.getAttribute('geodesic');
  }
  getGeometry() {
    if (!Cesium.defined(this.positions) || this.positions.length < 2) {
      return;
    }
    return new Cesium.PolylineGeometry({
      positions: this.positions,
      height: this.height,
      width: this.width < 1 ? 1 : this.width,
      vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
      ellipsoid: this.ellipsoid,
      material: new Cesium.Material({
        fabric: {
          type: 'Color',
          uniforms: {
            color: new Cesium.Color.fromCssColorString("rgba(25, 190,107, 0.1)")
          }
        }
      })
    });
  }
  setEditable() {
    if (this.setEditMode) {
      return;
    }
    let polyline = this;
    polyline.isPolygon = false;
    polyline.asynchronous = false;
    polyline.primitiveType = 'polyline';
    DrawHelper.registerEditableShape(polyline);
    polyline.setEditMode = DrawHelper.setEditMode;
    let originalWidth = this.width;
    polyline.setHighlighted = function (highlighted) {
      if (this._editMode === true) {
        return;
      }
      if (highlighted) {
        DrawHelper.setHighlighted(this);
        this.setWidth(originalWidth * 2)
      } else {
        this.setWidth(originalWidth);
      }
    }
    polyline.getExtent = function () {
      return Cesium.Extent.fromCartographicArray(ellipsoid.cartesianArrayToCartographicArray(this.positions));
    }
    enhanceWithListeners(polyline, DrawHelper);
    polyline.setEditMode(false);
  }
}

DrawHelper.PolygonPrimitive = class extends DrawHelper.ChangeablePrimitive {
  constructor(options) {
    super();
    options = earthCommon.copyOptions(options, defaultSurfaceOptions);
    super.initialiseOptions(options);
    this.isPolygon = true;
  }
  setPositions(positions) {
    super.setAttribute('positions', positions);
  }
  getPositions() {
    super.getAttribute('positions');
  }
  getGeometry() {
    if (!Cesium.defined(this.positions) || this.positions.length < 3) {
      return;
    }
    return Cesium.PolygonGeometry.fromPositions({
      positions: this.positions,
      height: this.height,
      vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
      stRotation: this.textureRotationAngle,
      ellipsoid: this.ellipsoid,
      granularity: this.granularity
    });
  }
  getOutlineGeometry() {
    return Cesium.PolygonOutlineGeometry.fromPositions({
      positions: this.getPositions()
    });
  }
  setEditable() {
    let polygon = this;
    polygon.asynchronous = false;
    polygon.primitiveType = 'polygon';

    DrawHelper.registerEditableShape(polygon);

    polygon.setEditMode = DrawHelper.setEditMode;
    polygon.setHighlighted = function (highlighted) {
      if (this._editMode === true) {
        return;
      }
      if (highlighted) {
        DrawHelper.setHighlighted(this);
      }
    };

    enhanceWithListeners(polygon, DrawHelper);
    polygon.setEditMode(false);
  }
}

/*****************通用函数定义******************/
function setListener(primitive, type, callback) {
  primitive[type] = callback;
}

/**
 * 初始化监听事件方法和添加监听事件方法
 * @param element
 */
function enhanceWithListeners(element, belong) {
  element._listeners = {};
  element.addListener = function (name, callback) {
    belong._listeners[name] = (belong._listeners[name] || []);
    belong._listeners[name].push(callback);
    return belong._listeners[name].length;
  }

  element.executeListeners = function (event, defaultCallback) {
    if (belong._listeners[event.name] && belong._listeners[event.name].length > 0) {
      var index = 0;
      for (; index < belong._listeners[event.name].length; index++) {
        belong._listeners[event.name][index](event);
      }
    } else {
      if (defaultCallback) {
        defaultCallback(event);
      }
    }
  }
}

function createTooltip(frameDiv) {

  let tooltip = function (frameDiv) {

    let div = document.createElement('DIV');
    div.className = "twipsy right";

    let arrow = document.createElement('DIV');
    arrow.className = "twipsy-arrow";
    div.appendChild(arrow);

    let title = document.createElement('DIV');
    title.className = "twipsy-inner";
    div.appendChild(title);

    this._div = div;
    this._title = title;

    // add to frame div and display coordinates
    frameDiv.appendChild(div);
  }

  tooltip.prototype.setVisible = function (visible) {
    this._div.style.display = visible ? 'block' : 'none';
  }

  tooltip.prototype.showAt = function (position, message) {
    if (position && message) {
      this.setVisible(true);
      this._title.innerHTML = message;
      this._div.style.left = position.x + 10 + "px";
      this._div.style.top = (position.y - this._div.clientHeight/2) + "px";
    }
  }

  return new tooltip(frameDiv);
}

function createGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 生成导入导出图层所需的文件上传控件
function createUploadElement() {
  // 生成图层导出文件上传控件
  let div = DrawHelper.viewer.container;
  let form_export = document.createElement('FORM');
  div.appendChild(form_export)
  form_export.action = "";
  form_export.id = "exportForm";
  form_export.method = "post";
  form_export.style = "display:none";
  form_export.enctype = "multipart/form-data";
  let input_export = document.createElement('INPUT');
  form_export.appendChild(input_export);
  input_export.type = "input";
  input_export.id = "geojsonData";
  input_export.name = "geojsons";

  // 生成图层导入文件上传控件
  let form_import = document.createElement('FORM');
  div.appendChild(form_import);
  form_import.action = "";
  form_import.id = "importForm";
  form_import.method = "post";
  form_import.style = "display:none";
  form_import.enctype = "multipart/form-data";
  let input_import = document.createElement('INPUT');
  form_import.appendChild(input_import);
  input_import.type = "file";
  input_import.id = 'geojsonFile';
  input_import.name = "shape_file";
}


export default DrawHelper;
