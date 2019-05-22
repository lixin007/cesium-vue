/**
 * Created by Administrator on 2019/2/18.
 */
import $ from 'jquery';
export default class earthCommon {
  constructor() {}

  static clone(from, to) {
    if (from == null || typeof from != "object") return from;
    if (from.constructor != Object && from.constructor != Array) return from;
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function || from.constructor == String || from.constructor == Number || from.constructor == Boolean) return new from.constructor(from);
    to = to || new from.constructor();
    for (let name in from) {
      to[name] = typeof to[name] == "undefined" ? this.clone(from[name], null) : to[name];
    }
    return to;
  }

  static fillOptions(options, defaultOptions) {
    options = options || {};
    let option = void 0;
    for (option in defaultOptions) {
      if (options[option] === undefined) {
        options[option] = this.clone(defaultOptions[option]);
      }
    }
    return options;
  }

  // 合并覆盖默认options和新options
  static copyOptions(options, defaultOptions) {
    let newOptions = this.clone(options), option = void 0;
    for (option in defaultOptions) {
      if (newOptions[option] === undefined) {
        newOptions[option] = this.clone(defaultOptions[option]);
      }
    }
    return newOptions;
  }

  // 检测数组中是否包含某个指定元素
  static isArrContain(key, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === key) {
        return true;
      }
    }
    return false;
  }

  // ajax请求封装
  static request(host, params) {
    if (params && params['url']) {
      if (params.url.indexOf('https') < 0) {
        params['url'] = host + params['url']
      }
    }
    if (!params['data']) {
      params['data'] = {}
    }
    $.ajax(params)
  }

  // 设置Cookie
  static setCookie(key, value, expireDays) {
    var exDate = new Date()
    exDate.setDate(exDate.getDate() + expireDays)
    document.cookie = key + "=" + escape(value) +
      ((expireDays == null) ? "" : ";expires=" + exDate.toGMTString())
  }


// 获取cookie
  static getCookie(key) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(key + "=")
      if (c_start != -1) {
        c_start = c_start + key.length + 1
        var c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }
}
