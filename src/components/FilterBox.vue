<template >
    <div :class="[isHorizontal ? 'horizontal' : 'vertical', ' bg-white rounded flex items-center h-full shadow-sm border border-gray-200 mx-auto p-4']">
        <div v-for="(filter, idx) in Object.keys(filters)" v-bind:key="filter+idx">
            <label class="flex items-center" v-for="(subFilt, idx) in filters[filter]" v-bind:key="subFilt+idx">
                <input class="mr-2" type="checkbox" :value="subFilt" v-model="checkedfilters">
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
      this.emitToSearch(val)
    },
    activeFilters: function(val){
        this.checkedfilters = val;
    }
  },
  methods: {
     emitToSearch (val) {
      this.$emit('filterToSearch', val)
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