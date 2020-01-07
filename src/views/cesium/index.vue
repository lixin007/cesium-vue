<template>
  <div id="cesiumContainer"></div>
</template>

<script>
// 局部组件引用
import Cesium from 'cesium/Cesium'
// noinspection ES6UnusedImports
import widget from 'cesium/Widgets/widgets.css'
import earthShell from 'earthFrame/EarthShell'
export default {
  name: "cesiumContainer",
  mounted() {
    this.$nextTick(() => {
      this.cesiumInit()
    })
  },
  methods: {
    cesiumInit() {
      let viewer = new Cesium.Viewer('cesiumContainer');
      const a1 = {
        "name": "ss1",
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  90.3515625,
                  69.77895177646761
                ],
                [
                  60.46875,
                  48.69096039092549
                ],
                [
                  34.1015625,
                  53.330872983017066
                ]
              ]
            }
          }
        ]
      }
      viewer.dataSources.add(Cesium.GeoJsonDataSource.load(a1,{
        sourceUri:"ss1",
        stroke: Cesium.Color.RED,
        strokeWidth: 10,
        markerSymbol: '?'
      }));
      const a2 = {
        "name": "ss2",
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  90.3515625,
                  69.77895177646761
                ],
                [
                  60.46875,
                  48.69096039092549
                ],
                [
                  34.1015625,
                  53.330872983017066
                ]
              ]
            }
          }
        ]
      }

      const promise= viewer.dataSources.add(Cesium.GeoJsonDataSource.load(a2,{
        sourceUri:"ss2",
        stroke: Cesium.Color.BLUE,
        strokeWidth: 10,
        markerSymbol: '?'
      }));
      for (let i = 0; i < viewer.dataSources._dataSources.length; i++) {
        if ( viewer.dataSources._dataSources[i].name =="ss2") {
          let entities = viewer.dataSources._dataSources[i].entities.values
          console.log(viewer.dataSources._dataSources[i].entities.values)
          for (let i2 = 0; i2 < entities.length; i2++) {
            const entity = entities[i2]
            entity.polyline.zIndex = 1000
            entity.polyline.width = 100
            entity.polyline.clampToGround = true
            // console.log(entity.polyline)
          }
        } else {
          let entities = viewer.dataSources._dataSources[i].entities.values
          console.log(viewer.dataSources._dataSources[i].entities.values)
          for (let i2 = 0; i2 < entities.length; i2++) {
            const entity = entities[i2]
            entity.polyline.zIndex = 10
            entity.polyline.clampToGround = true
            // console.log(entity.polyline)
          }
        }
      }

      for (let i = 0; i < viewer.dataSources._dataSources.length; i++) {
          let entities = viewer.dataSources._dataSources[i].entities.values
          for (let i2 = 0; i2 < entities.length; i2++) {
            const entity = entities[i2]
            console.log(entity.polyline.zIndex)
          }
      }
      viewer.flyTo(promise);
    }
  }
}
</script>
