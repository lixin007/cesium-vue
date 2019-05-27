<template>
    <div>
      <c-father></c-father>
    </div>
</template>

<script>
    import cFather from "@/components/MyComponents/c-father.vue"
    export default {
        name: "test0003",
        components:{
          "c-father": cFather
        },
    }
</script>

<style scoped>

</style>
