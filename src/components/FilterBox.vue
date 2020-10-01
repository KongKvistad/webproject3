<template >
    <fieldset>
        <div v-for="(filter, idx) in Object.keys(filters)" v-bind:key="filter+idx">
            <label v-for="(subFilt, idx) in filters[filter]" v-bind:key="subFilt+idx">
                <input type="checkbox" :value="subFilt" v-model="checkedfilters">
                <span>{{subFilt}}</span>
            </label>
        </div>
    </fieldset>
</template>

<script>
export default {
  name: 'FilterBox',
  props: ["filters"],

  data(){
    return {
        checkedfilters:[]
    }
  },
  
  
  
}
</script>

<style>

</style>