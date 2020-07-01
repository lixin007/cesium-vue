<template>
    <div>
      <el-col :span="8">
        <div id="main">
          <div style="background-color:coral;">RED</div>
          <div style="background-color:lightblue;">BLUE</div>
          <div style="background-color:lightgreen;">Green div with more content.</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div id="main2">
          <div style="background-color:coral;"></div>
          <div style="background-color:lightblue;"></div>
          <div style="background-color:pink;"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div id="main3">
          <div style="background-color:coral;"></div>
          <div style="background-color:lightblue;"></div>
          <div style="background-color:khaki;"></div>
          <div style="background-color:pink;"></div>
        </div>
      </el-col>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  #main {
    width: 220px;
    height: 300px;
    border: 1px solid black;
    display: -webkit-flex; /* Safari */
    -webkit-align-items: center; /* Safari 7.0+ */
    display: flex;
    align-items: center;
  }

  #main div {
    -webkit-flex: 1; /* Safari 6.1+ */
    flex: 1;
  }

  #main2 {
    width: 70px;
    height: 300px;
    border: 1px solid #c3c3c3;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-content: center;
    align-content: center;
  }

  #main2 div {
    width: 70px;
    height: 70px;
  }

  #main3 {
    width: 400px;
    height: 150px;
    border: 1px solid #c3c3c3;
    display: -webkit-flex; /* Safari */
    -webkit-justify-content: space-around; /* Safari 6.1+ */
    display: flex;
    justify-content: space-around;
  }

  #main3 div {
    width: 70px;
    height: 70px;
  }



</style>
