<template>
    <div>
      try6
<!--      <my-try colorType="a-danger font-big"/>-->
      <test-toast ref="toast"></test-toast>
    </div>
</template>

<script>
    import tsg from  "tsg1899"
    export default {
      name: "test0006",
      mounted() {
        tsg.npmTest("84710")
        tsg.yz()
        const { yz2,yz4 } = tsg
        console.log(yz2)
        const person = new yz4('leon',30)
        console.log(person.say())
      }
    }
</script>

<style scoped>

</style>
