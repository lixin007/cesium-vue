<template>
  <div>
    <c-child name="rick" :age="886"></c-child>
    <c-child name="rick2"></c-child>
  </div>
</template>

<script>
  import cChild from "@/components/MyComponents/c-child.vue"
    export default {
        name: "c-father",
        components:{
          "c-child": cChild
        },
    }
</script>

<style scoped>

</style>
