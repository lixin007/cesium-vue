<template>
  <div>
    <div class="hello">
      <chart ref="chart1" :options="orgOptions" :auto-resize="true"  style="width: 100%;height:calc(100vh - 55px)" @resize="resize"></chart>
    </div>
  </div>
</template>

<script>
  // import jsonData from '@/json/try01'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        orgOptions: {},
        jsonData: require("@/json/try01")
      }
    },
    methods: {
      resize(){
      }
    },
    mounted() {
      // console.log(jsonData)
      console.log(this.jsonData)
      this.orgOptions = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {top: '55%'},
        series: [
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: '2012',
              tooltip: '2012'
            }
          }
        ]
      }

      window.onresize = ()=>{
        this.$refs.chart1.resize()
      }
    }
  }
</script>

<style scoped>

</style>
