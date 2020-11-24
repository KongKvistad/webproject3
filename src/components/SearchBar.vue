<template>

  <div class="box" :class="fromHome ? 'w-3/5': 'w-full'">
    <div class="box-wrapper">
      <div class=" bg-white rounded flex items-center justify-between w-full shadow-sm border border-none" v-if="clickedItem">
        <div class="bg-gray w-2/5 flex p-5">
          <img class="h-6 mr-5" v-if="clickedItem.type == 'Country'" src="@/assets/world.svg"/>
          <img class="h-6 mr-5" v-else src="@/assets/city.svg"/>
          <p>{{clickedItem.name}}</p>
        </div>
      
        <div class="w-3/12 flex justify-evenly items-center">
        <img class="h-5 w-1/2" v-on:click="removeItem()" src="@/assets/cross.svg">
          <button type="submit" class="py-5 w-1/2 bg-indigo-500 text-white" v-on:click="search()">
            <p>Go</p>
          </button>
        </div>
      </div>
      <div class=" bg-white rounded flex items-center justify-between w-full shadow-sm border border-none" v-else-if="this.$route.query.searchTerm && this.$route.query.searchTerm !== 'false' && !willSearchAgain">
      <div class="bg-gray w-2/5 flex p-5">
          <img class="h-6 mr-5" v-if="this.$route.query.type == 'Country'" src="@/assets/world.svg"/>
          <img class="h-6 mr-5" v-else src="@/assets/city.svg"/>
          <p>{{this.$route.query.searchTerm}}</p>
        </div>
      
        <div class="w-full flex justify-end items-end">
          <img class="h-5 w-1/6" v-on:click="willSearchAgain = true" src="@/assets/cross.svg">
        </div>
      </div>
      <div v-else class=" bg-white rounded flex items-center w-full shadow-sm border border-gray-200">
        <button class="outline-none focus:outline-none m-5"><svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
        <input v-model="searchTerm" v-on:keyup="emitToParent(searchTerm)" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="Search country..." class="w-full p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
        <div v-if="fromHome" class="select w-2/6 bg-gray-300 p-5">
          <select v-model="activeCat" name="" id="" x-model="image_type" class="text-sm outline-none focus:outline-none bg-transparent">
            <option  v-for="(cat, idx) in cats" v-bind:key="cat+idx" :value="cat">{{cat}}</option>
          </select>
        </div>
      </div>
      <ul v-if="matches.length > 0 && !clickedItem" class="relative mx-auto text-gray-600 dropdown">
          <li v-on:click="setItem(item)"
            v-for="(item, idx) in matches"
            :key="item.name+idx"
            class="mt-2 bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
              <img class="h-6 mr-5" v-if="item.type == 'Country'" src="@/assets/world.svg"/>
              <img class="h-6 mr-5" v-else src="@/assets/city.svg"/>
              <p>{{item.name}} {{item.num ? "(" + item.num + ")" : ""}}</p>
          </li>
        </ul>
    </div>
  </div>

  
</template>


<script>

export default {
  name:"SearchBar",
  props: ["matches", "cats", "cleanTerm", "fromHome"],
  data(){
    return {
      searchTerm:'',
      clickedItem: false,
      activeCat: this.cats[0],
      willSearchAgain: false
    }
  },
  methods: {
     emitToParent (term) {
      this.$emit('childToParent', term)
    },
    
    setItem(entity){
      this.clickedItem = entity
      this.searchTerm = entity.name
      this.emitToParent(entity.name)
    },

    removeItem(){
      this.clickedItem = false
      this.searchTerm = ''
      this.emitToParent(false)

    },
    search(){
      this.$emit('searchClicked');
    }
  },
  watch:{
    activeCat: function(val){
      this.$emit('catsChanged', val)
  },
    cleanTerm:function(val){
      if(val == ""){
         this.searchTerm = ''
      }
     
    },
    clickedItem: function(){
      if(this.clickedItem){
        this.$emit('clickedItem', this.clickedItem)
      }
      
    }
  },
  created(){
    console.log(this.$route.query)
  }

}
</script>

<style>



</style>