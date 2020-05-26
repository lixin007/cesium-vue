<template>
  <div class="navbar">
    <ul id="main">
      <li><router-link  to="test81">test81</router-link></li>
      <li><router-link  to="test82">test82</router-link></li>
      <li><router-link  to="test83">test83</router-link></li>
    </ul>
    <!-- 路由匹配到的组件将显示在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "test00081"
    }
</script>

<style scoped>

</style>
