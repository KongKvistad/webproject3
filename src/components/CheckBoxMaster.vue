<template>
    <div class= "checkboxes">
        <limitSearch
        v-on:checkbox="checkboxes"
        v-for="(subcats, idx) in cleanCats"
        :heading="idx"
        :key="idx"
        :subCat="subcats"
        :activeFilters="activeFilters"
        
        />
    </div>
</template>

<script>

import limitSearch from '@/components/limitSearch'


export default {
  name: 'CheckBoxMaster',
  props: ["cats", "activeFilters"],
  components: {
      limitSearch
  },
  computed: {
      cleanCats(){
          delete this.cats["uid"];
          return this.cats
      }
  },
  methods:{
      checkboxes: function(value){
            this.$emit("checkbox", value)
        },
  },
  created(){
      //delete this.cat["uid"]; 
  }
}
</script>


<style scoped>
/* PLEASE ikke glem "scoped"-taggen, brukte 10 min på å debugge */

</style>