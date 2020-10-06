<template>
  <main>
      <section class="leftCol">
       <RadioBtns v-on:childToParent="onCatsChange" v-if="this.cats.length > 0" :cats="this.cats" :isHorizontal="true"/>
       <SearchBar v-on:childToParent="onSearchChange" :matches="this.matches" v-on:searchClicked="search"/>
      </section>
      <section class="rightCol">
       <FilterBox v-on:childToParent="onFilterChange"
      :filters="this.filters[this.activeCats]"
      v-if="this.activeCats" :isHorizontal="false"
      :activeFilters="activeFilters" />
      </section>
  </main>
</template>

<script>
import {getCollections, filtersWithHeaders} from '../helpers/collections.js'
//import {db} from '../components/firebaseInit.js'
import SearchBar from '../components/SearchBar'
import FilterBox from '../components/FilterBox'
import RadioBtns from '../components/RadioBtns'

export default {
  name: 'Home',
  components: {
    SearchBar,
    FilterBox,
    RadioBtns
  },

  data(){
    return {
      results:[],
      searchTerm:false,
      matches:[],
      filters: [],
      activeFilters: [],
      activeCats:"",
      cats: []
     
    }
  },
  
  methods: {
    //needed to empty out all filter values if cats change
    cleanData(){
      this.activeFilters = [];
    },

    onSearchChange: function(value){
      this.searchTerm = value
      
    },
    onCatsChange: function(value){
      this.activeCats = value
      this.cleanData()
    },

    onFilterChange: function(value){
      this.activeFilters = value
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
        cat: this.activeCats
        }
      console.log(obj)
      this.$router.push({ path: 'discover', query: obj })
    }
     
  },
  watch:{
    searchTerm: function(){
      if(this.searchTerm == ""){
        this.matches = false;

      } else {
        let countries = this.findMatches(this.searchTerm, "country")
        let cities = this.findMatches(this.searchTerm, "city")
        this.matches = countries.concat(cities)
      }
      


    }
  },
  created(){
    // initialize values
    this.results = getCollections("Work", true);
   
    filtersWithHeaders().then(res => {
    
      this.filters = res
      this.cats = Object.keys(res)
      this.activeCats=this.cats[0]
    
    });
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 main{
     background-color:blue;
    display: flex;
    height: calc(100vh - 1em);
    width: 100vw;
    display: flex;
 }
 .leftCol{
   display: flex;
   flex-basis:75%;
   flex-direction: column;
   
 }
 
 .rightCol{
   display: flex;
   flex-basis:25%;
 }


</style>
