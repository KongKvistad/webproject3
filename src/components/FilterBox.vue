<template >
    <div :class="[isHorizontal ? 'horizontal' : 'vertical', 'filterComp']">
        <div v-for="(filter, idx) in Object.keys(filters)" v-bind:key="filter+idx">
            <label v-for="(subFilt, idx) in filters[filter]" v-bind:key="subFilt+idx">
                <input type="checkbox" :value="subFilt" v-model="checkedfilters">
                <span>{{subFilt}}</span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FilterBox',
  props: ["filters", "isHorizontal", "activeFilters"],

  data(){
    return {
        checkedfilters: this.activeFilters
    }
  },
  watch:{
    checkedfilters: function(val){
      this.emitToParent(val)
    },
    activeFilters: function(val){
        this.checkedfilters = val;
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
.vertical{
    display: flex;
    flex-direction: column;
}

.vertical > div{
    display: flex;
    flex-direction: column;
}
</style>