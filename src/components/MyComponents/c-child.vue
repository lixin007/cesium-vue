<template>
  <div>
    props:{{name}},{{level}},{{age}}
    <br>
    attrs: {{$attrs['gender']}}
  </div>
</template>

<script>
    export default {
      name: "c-child",
      props: {
        name: String,
        level: {
          type: Number,
          default: 5,
        },
        age:{
          type: Number,
          default: function () {
            return 20
          }
        },
      }
    }
</script>

<style scoped>

</style>
