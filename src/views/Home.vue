<template>
  <main>
       <RadioBtns v-on:childToParent="onFilterChange" v-if="this.cats.length > 0" :cats="this.cats"/>
       <SearchBar v-on:childToParent="onChildChange" :matches="this.matches"/>
       <FilterBox :filters="this.filters[this.activeFilters]" v-if="this.activeFilters" />
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
      searchTerm:'',
      matches:[],
      filters: [],
      activeFilters:"",
      cats: []
     
    }
  },
  
  methods: {
    onChildChange: function(value){
      this.searchTerm = value
      
    },
    onFilterChange: function(value){
      this.activeFilters = value
      console.log(this)
    },
    findMatches: function(val, type){
      
      //look for matching strings and count occurences of same value in name
      let match = this.results.filter(x => x[type].toLowerCase().indexOf(val) >= 0)
      let names = match.map(x => {
        return {type: type, name: x[type], num: match.filter(y => y[type]== x[type]).length}
      })
      
      // remove duplicates
      return names.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
    }
   
      
     
  },
  watch:{
    searchTerm: function(){
      if(this.searchTerm == ""){
        this.matches = [{name: "no results!"}];

      } else {
        let countries = this.findMatches(this.searchTerm, "country")
        let cities = this.findMatches(this.searchTerm, "city")
        this.matches = countries.concat(cities)
      }
      


    }
  },
  created(){
    
    this.results = getCollections("Work", true);
   
    filtersWithHeaders().then(res => {
    
      this.filters = res
      this.cats = Object.keys(res)
      this.activeFilters=this.cats[0]
    
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
 }


.container:hover input ~ .checkmark {
  background-color: #a0aec0;
}

.container input:checked ~ .checkmark {
  background-color: #0078d4;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 9px;
  top: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
