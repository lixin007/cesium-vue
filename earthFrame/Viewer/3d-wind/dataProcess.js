import Cesium from 'cesium/Cesium';
import netcdfjs from 'netcdfjs';
import Util from './util';
let _util = new Util();
let data;
export default class dataProcess {
  constructor() {}

  loadNetCDF(filePath) {
      return new Promise(function (resolve) {
          var request = new XMLHttpRequest();
          request.open('GET', filePath);
          request.responseType = 'arraybuffer';

          request.onload = function () {
              var arrayToMap = function (array) {
                  return array.reduce(function (map, object) {
                      map[object.name] = object;
                      return map;
                  }, {});
              }
              console.log(request.response);
              var NetCDF = new netcdfjs(request.response);
              console.log(NetCDF);
              data = {};

              var dimensions = arrayToMap(NetCDF.dimensions);
              console.log(dimensions);
              data.dimensions = {};
              data.dimensions.lon = dimensions['lon'].size;
              data.dimensions.lat = dimensions['lat'].size;
              data.dimensions.lev = dimensions['lev'].size;

              var variables = arrayToMap(NetCDF.variables);
              console.log(variables);
              var uAttributes = arrayToMap(variables['U'].attributes);
              var vAttributes = arrayToMap(variables['V'].attributes);
              console.log(uAttributes);
              console.log(vAttributes);

              data.lon = {};
              data.lon.array = new Float32Array(NetCDF.getDataVariable('lon').flat());
              console.log("lon:" + data.lon.array.length);
              data.lon.min = Math.min(...data.lon.array);
              data.lon.max = Math.max(...data.lon.array);

              data.lat = {};
              data.lat.array = new Float32Array(NetCDF.getDataVariable('lat').flat());
              console.log("lat:" + data.lat.array.length);
              data.lat.min = Math.min(...data.lat.array);
              data.lat.max = Math.max(...data.lat.array);

              data.lev = {};
              data.lev.array = new Float32Array(NetCDF.getDataVariable('lev').flat());
              console.log("lev:" + data.lev.array.length);
              data.lev.min = Math.min(...data.lev.array);
              data.lev.max = Math.max(...data.lev.array);

              data.U = {};
              data.U.array = new Float32Array(NetCDF.getDataVariable('U').flat());
              console.log("U:" + data.U.array.length);
              data.U.min = uAttributes['min'].value;
              data.U.max = uAttributes['max'].value;

              data.V = {};
              data.V.array = new Float32Array(NetCDF.getDataVariable('V').flat());
              console.log("V:" + data.V.array.length);
              data.V.min = vAttributes['min'].value;
              data.V.max = vAttributes['max'].value;

              resolve(data);
          };

          request.send();
      });
  }

    loadColorTable(filePath) {
        var string = _util.loadText(filePath);
        var json = JSON.parse(string);

        var colorNum = json['ncolors'];
        var colorTable = json['colorTable'];

        var colorsArray = new Float32Array(3 * colorNum);
        for (var i = 0; i < colorNum; i++) {
            colorsArray[3 * i] = colorTable[3 * i];
            colorsArray[3 * i + 1] = colorTable[3 * i + 1];
            colorsArray[3 * i + 2] = colorTable[3 * i + 2];
        }

        data.colorTable = {};
        data.colorTable.colorNum = colorNum;
        data.colorTable.array = colorsArray;
    }

    async loadData() {
      var ncFilePath = "../../../../../static/SampleData/demo.nc";
      await this.loadNetCDF(ncFilePath);

      var colorTableFilePath = '../../../../../static/SampleData/colorTable.json';
      this.loadColorTable(colorTableFilePath);
      return data;
    }

    randomizeParticles(maxParticles, viewerParameters) {
        var array = new Float32Array(4 * maxParticles);
        for (var i = 0; i < maxParticles; i++) {
            array[4 * i] = Cesium.Math.randomBetween(viewerParameters.lonRange.x, viewerParameters.lonRange.y);
            array[4 * i + 1] = Cesium.Math.randomBetween(viewerParameters.latRange.x, viewerParameters.latRange.y);
            array[4 * i + 2] = Cesium.Math.randomBetween(data.lev.min, data.lev.max);
            array[4 * i + 3] = 0.0;
        }
        return array;
    }
}
