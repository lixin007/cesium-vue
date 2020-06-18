<template>
  <div>
    <el-table
      :data="tableData"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%;margin-bottom: 20px;"
      :row-key="getRowKeys"
      :expand-row-keys="expandsKeys"
      @expand-change="expandChange"
      @current-change="toggleRowExpansion"
      >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="reset">确定</el-button>


  </div>
</template>
<script>
  export default {
    name: 'table2',
    data() {
      return {
        expandsKeys:["GD099200200300002"],
        tableData: [{
          id: "GD099200200300001",
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: "GD099200200300002",
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          children: [{
            id: 21,
            date: '2019-05-01',
            name: '王虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 22,
            date: '2019-05-01',
            name: '王虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: "GD099200200300003",
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: "GD099200200300004",
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      reset(){
        this.tableData = [{
          id: "GD099200200300001",
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: "GD099200200300002",
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          children: [{
            id: 21,
            date: '2019-05-01',
            name: '王虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 22,
            date: '2019-05-01',
            name: '王虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: "GD099200200300003",
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 33,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1520 弄'
          }]
        }, {
          id: "GD099200200300004",
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      },
      getRowKeys(row) {
        return row.id
      },
      toggleRowExpansion(row){

      },

      expandChange(row,expandedRows){
         if (expandedRows) {
           this.expandsKeys.push(row.id)
         } else {
           if(_.includes(this.expandsKeys, row.id)) {
             _.pull(this.expandsKeys, row.id)
           }
         }
         console.log(this.expandsKeys)

      },
    },
  }
</script>
