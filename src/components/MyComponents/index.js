import cFatherComponent  from "@/components/MyComponents/c-father.vue"

const cFather = {
   install: function(vue) {
     vue.component('cctvTvb',cFatherComponent)
   }
}
export default cFather
