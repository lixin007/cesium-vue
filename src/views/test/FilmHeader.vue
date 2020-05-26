<template>
  <!-- 主页.vue引用该组件上加类名，相当于这里最外层div加上了该类名 -->
  <div>
    <ul>
      <router-link to="/film/nowplaying" tag="li" activeClass="active">正在热映</router-link>
      <router-link to="/film/comingsoon" tag="li" activeClass="active">即将上演</router-link>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .active{
    color:red;
    border-bottom: 2px solid red;
  }

  //主页.vue中引用组件上加类名，在组件中对该类名进行css操作
  .fixed{
    position: fixed;
    left:0px;
    top:0px;
    width:100%;
    height:40px;
    background:white;
  }
</style>
