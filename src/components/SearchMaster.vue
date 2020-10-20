<template>
    <SearchBar v-on:childToParent="onSearchChange" 
    v-on:catsChanged="onCatsChange"
    v-on:clickedItem="onClickedItemChanged" 
    v-on:searchClicked="search" 
    :matches="this.matches" 
    v-if="this.cats.length > 0" 
    :cats="this.cats" 
    :fromHome="this.fromHome"
    :cleanTerm="this.searchTerm"/>
    
</template>

<script>

import SearchBar from '../components/SearchBar'


export default {
  name: 'SearchMaster',
  components: {
    SearchBar,
  },
  props:["results", "cats", "activeFilters", "activeCats", "fromHome"],

  data(){
    return {
      searchTerm:false,
      matches:[],
      clickedItem: false
    }
  },
  
  
  methods: {
   
   
  

    //needed to empty out all filter values if cats change
    cleanData(){
      this.matches =[];
      this.searchTerm = "";
    },    

    onSearchChange: function(value){
      this.searchTerm = value
      
    },
    onCatsChange: function(value){
      this.$emit('catsChanged', value)
      this.cleanData()
    },

    onClickedItemChanged:function(value){
      this.clickedItem = value
    },

    

    findMatches: function(val, type){
      
      //look for matching strings and count occurences of same value in name
      let match = this.results.filter(x => x[type].toLowerCase().indexOf(val) >= 0)
      let names = match.map(x => {
        return {type: type, name: x[type], num: match.filter(y => y[type]== x[type]).length}
      })
      
      // remove duplicates
      return names.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
    },
   
   //construct query bases on data and navigate to discover
    search: function(){
      let obj = {
        searchTerm: this.searchTerm,
        filters: this.activeFilters.join("+"),
        cat: this.activeCats,
        type: this.clickedItem.type
        }
      console.log(obj)
      if(this.$route.name == "discover"){
         this.$router.push({ path: 'discover', query: obj }).then(this.$router.go(this.$router.currentRoute))
      }
      this.$router.push({ path: 'discover', query: obj })
    }
     
  },
  watch:{
    searchTerm: function(){
      if(this.searchTerm == ""){
        this.matches = false;

      } else {
        let countries = this.findMatches(this.searchTerm, "Country")
        let cities = this.findMatches(this.searchTerm, "City")
        this.matches = countries.concat(cities)
      }
    
    }
  },
  
  
}
</script>
