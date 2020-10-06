<template>
  <div :class="[isHorizontal ? 'horizontal' : 'vertical', 'radioComp']">
    <div  v-for="(cat, idx) in cats" v-bind:key="cat+idx">
    <input :id="cat" type="radio" v-model="activeCat" :value="cat">
    <label :for="cat">{{cat}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioBtns',
  
  props: {
    cats: {
      type: Array,
      required: true,
    },
    isHorizontal: {
      type: Boolean,
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

.horizontal{
  display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: space-between;

}
.horizontal > div{
  
}



</style>