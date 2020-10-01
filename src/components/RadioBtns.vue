<template>
  <fieldset>
    <div v-for="(cat, idx) in cats" v-bind:key="cat+idx">
    <input :id="cat" type="radio" v-model="activeCat" :value="cat">
    <label :for="cat">{{cat}}</label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'RadioBtns',
  
  props: {
    cats: {
      type: Array,
      required: true,
    },
  },

  data(){
    return {
      activeCat: this.cats[0],
    }
  },
  
  created(){
    
  },
  watch:{
    activeCat: function(val){
      this.emitToParent(val)
    }
  },
  methods: {
     emitToParent (val) {
      this.$emit('childToParent', val)
    }
  }
  
}
</script>

<style>

</style>