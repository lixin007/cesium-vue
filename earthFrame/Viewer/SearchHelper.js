/**
 * Created by Administrator on 2019/3/21.
 */
import Cesium from 'cesium/Cesium';
import widgets from 'cesium/Widgets/widgets.css';
import earthCommon from '../Common/earthCommon';
import locationIcon from '../Icons/icon-location.png';
import axios from 'axios';

const SearchHelper = (function () {
  let _viewer = null;
  class SearchHelper {
    constructor(viewer, options) {
      _viewer = viewer;
      let defaultOptions = {};
      if (options) {
        options = earthCommon.copyOptions(options, defaultOptions);
      }
      else
        options = defaultOptions;
      this.options = options;
    }

    /**
     * 通过经纬度定位
     * @param position 为json格式，需要包含经度lng，纬度lat，视距stadia
     */
    lnglatPositioning(position) {
      _viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.stadia),
        duration: 5
      })
    }

    /**
     * 获取行政区域区划搜索历史记录，最近十条
     * @param callback 回调函数
     * @param options json结构参数配置
     */
    getSearchHisList(callback, options) {
      let _this = this;
      if (!options)
        options = {}
      let defaultOptions = {
        query: ''
      }
      options = earthCommon.copyOptions(options, defaultOptions);
      // earthCommon.request(_this.options.baseUrl, {
      //   url: '/area/history',
      //   type: "POST",
      //   data: JSON.stringify({
      //     query: options.query
      //   }),
      //   contentType: 'application/json',
      //   beforeSend: function (xhr) {
      //     xhr.setRequestHeader("Authorization", earthCommon.getCookie('sessionId'));
      //   },
      //   success: function (data) {
      //     if (typeof callback === 'function')
      //       callback(data.list)
      //   },
      //   error: function (xhr, type, err) {
      //     if (xhr.status === 401) {
      //
      //     }
      //   }
      // });

    }

    /**
     * 删除搜索历史列表中的指定项
     * @param query 待删除记录的
     * @param callback 删除成功回调函数
     */
    delSearchHisItem(query, callback) {
      let _this = this;
      // earthCommon.request(_this.options.baseUrl, {
      //   url: '/area/deletehistory?query=' + query,
      //   type: 'GET',
      //   contentType: 'application/json',
      //   beforeSend: function (xhr) {
      //     xhr.setRequestHeader("Authorization", earthCommon.getCookie('sessionId'));
      //   },
      //   success: function success(data) {
      //     if (typeof callback === 'function')
      //       callback()
      //   },
      //   error: function (xhr, err, obj) {
      //     if (xhr.status === 401) {
      //
      //     }
      //   }
      // });
    }

    coditionSearch(options, callback, online) {
      let _this = this;
      let defaultOptions = {
        output: 'json'
      }
      options = earthCommon.copyOptions(options, defaultOptions);
      if (options.searchtype === 'area') {
        let searchPath = '/area/search';
        if (!online) {
          searchPath = '/area/searchOffline'
          delete options.region;
        }
        // earthCommon.request(_this.options.baseUrl, {
        //   url: searchPath,
        //   type: 'POST',
        //   data: JSON.stringify(options),
        //   contentType: 'application/json',
        //   beforeSend: function (xhr) {
        //     xhr.setRequestHeader("Authorization", earthCommon.getCookie('sessionId'));
        //   },
        //   success: function success(data) {
        //     for (var i in data.results) {
        //       let b = new Cesium.BillboardCollection();
        //       var billboardPrimitive = _viewer.scene.primitives.add(b);
        //       var poi = null
        //       if (online) {
        //         poi = Cesium.Cartesian3.fromDegrees(data.results[i].location.lng, data.results[i].location.lat)
        //       } else {
        //         poi = Cesium.Cartesian3.fromDegrees(data.results[i].lng, data.results[i].lat)
        //       }
        //       b.add({
        //         show: true,
        //         position: poi,
        //         pixelOffset: new Cesium.Cartesian2(0, 0),
        //         eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
        //         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        //         verticalOrigin: Cesium.VerticalOrigin.CENTER,
        //         scale: 1.0,
        //         image: locationIcon,
        //         color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
        //       });
        //
        //       var l = new Cesium.LabelCollection();
        //       var labelPrimitive = _viewer.scene.primitives.add(l);
        //       l.add({
        //         position: poi,
        //         text: data.results[i].name,
        //         font: '18px sans-serif',
        //         backgroundColor: new Cesium.Color(0, 0, 0, 1),
        //         showBackground: true,
        //         horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        //         verticalOrigin: Cesium.VerticalOrigin.BASELINE
        //       })
        //     }
        //     if (typeof callback === 'function')
        //       if (data)
        //         callback(data)
        //       else
        //         callback([])
        //   }
        // });
      }
    }
  }
  return SearchHelper
})();

export default SearchHelper;
