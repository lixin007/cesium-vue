<template>
  <div class="child-2">
    <p>in child2:</p>
    <p>props: {{pChild2}}</p>
    <p>$attrs: {{$attrs}}</p>
    <hr>
  </div>
</template>
<script>
    export default {
        name: "attrchild2",
      props: ['pChild2'],
      data () {
        return {};
      },
      inheritAttrs: false,
      mounted () {
        this.$emit('test2');
      }
    }
</script>

<style scoped>

</style>
