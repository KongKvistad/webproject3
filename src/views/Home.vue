<template>
    <main>
        <div class="banner-area">
          <div class="content-area">
            <div class="content">
              <!--DON'T DELETE ME YOU SILLY GOOSE
              <RadioBtns v-on:childToParent="onCatsChange" v-if="this.cats.length > 0" :cats="this.cats" :isHorizontal="true"/>-->
              <section class="w-full flex justify-between">
                <SearchBar v-on:childToParent="onSearchChange" 
                v-on:catsChanged="onCatsChange"
                v-on:clickedItem="onClickedItemChanged" 
                v-on:searchClicked="search" 
                :matches="this.matches" 
                v-if="this.cats.length > 0" 
                :cats="this.cats" 
                :cleanTerm="this.searchTerm"/>
                
                <FilterBox v-on:childToParent="onFilterChange"
                :filters="this.filters[this.activeCats]"
                v-if="this.activeCats" :isHorizontal="false"
                :activeFilters="activeFilters" />
              </section>
              <div class="headline">Opportunities abroad.</div>
              <div class="under-headline">Made easy.</div>
            </div>
          </div>
        </div>
        <div class="content-suggestion">
          <h1>Maybe you're interested in...</h1>
          <p>E-courses</p>
          <div class="smallCard">

            <SmallCard v-for="item in randomList(e_course).slice(0, 3)" :key="item.id" :item="item" :content="item.content" :price="item.price" :routePath="pathEcourse"/>            
          </div>
        </div>
    </main>
  </template>

<script>
import {getCollections, filtersWithHeaders} from '../helpers/collections.js'
import {db} from '../components/firebaseInit.js'
import SearchBar from '../components/SearchBar'
import FilterBox from '../components/FilterBox'
//import RadioBtns from '../components/RadioBtns'
import SmallCard from '../components/SmallCard.vue'

export default {
  name: 'Home',
  components: {
    SearchBar,
    FilterBox,
    //RadioBtns,
    SmallCard
  },

  data(){
    return {
      results:[],
      e_course: [],
      searchTerm:false,
      matches:[],
      filters: [],
      activeFilters: [],
      activeCats:"",
      cats: [],
      clickedItem: false
    }
  },
  
  // smallCard click path for displaying full data in seperate view
  computed: {
    pathEcourse () {
      return this.$store.state.routePath.ecourse
    }
  },
  
  methods: {
   
    randomList: function(rand){
      return rand.slice().sort(function(){return 0.5 - Math.random()});
      },

  

    //needed to empty out all filter values if cats change
    cleanData(){
      this.activeFilters = [];
      this.matches =[];
      this.searchTerm = "";
    },

    

    onSearchChange: function(value){
      this.searchTerm = value
      
    },
    onCatsChange: function(value){
      this.activeCats = value
      
      this.cleanData()
      this.populate(value)
    },

    onFilterChange: function(value){
      this.activeFilters = value
      
    },
    onClickedItemChanged:function(value){
      this.clickedItem = value
    },

    populate: function(type){
      this.results = getCollections(type, true);
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
  created(){
    // initialize values
    
   
    filtersWithHeaders().then(res => {
    
      this.filters = res
      this.cats = Object.keys(res)
      this.activeCats=this.cats[0]
      this.populate(this.activeCats)
    
    });
    
     // Get e-course data fro db used for displaying suggested content on home page
    db.collection('E-course').get()
    .then(qs => {
      qs.forEach(doc => {
        const data = {
          'id': doc.id,
          'content': doc.data().content,
          'price': doc.data().price
        }
        this.e_course.push(data)
      })
    })
     
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    main {
      width: auto;
      margin: auto;
    }
   
   /* Search bar and main content text */
   .banner-area {
     width: 100%;
     height: 100vh;
     background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../assets/students-park.jpg);
     background-size: cover;
     background-position: center;
     opacity: 90;
   }
   
   .content-area {
      display: flex;
     justify-content: center;
     flex-direction: column;
     align-items: center;
   }
     
   .content {
     text-align: center;
     margin-top: 10%;
     width: 72%;
     position: relative
   }
   
   
   .headline {
     padding-right: 1rem;
     padding-left: 1rem;
     margin-top: 2rem;
     font-size: 4vw;
     background-color: #5E80F8;
     color: white;
     text-align: left;
     position: absolute;
     top:1em;
   }
   
   .under-headline {
     padding: 0.5rem;
     margin-top: 1rem;
     font-size: 2vw;
     float: left;
     background-color: #5E80F8;
     color: white;
     text-align: left;

     position: absolute;
     top:6em;
   }
   
   
   /* Content suggestions */
   
   .content-suggestion {
      background-color: white;
    }

    .content-suggestion > h1 {
      font-size: 36px;
      padding: 2%;
      text-align: center;
    }

    .content-suggestion > p {
      font-size: 24px;
      padding: 3%;
      margin-left: 3%;
    }
   

  

   .content-suggestion-cards {
      
    }
   
   .smallCard {
     display: flex;
     flex-direction: columns;
   }
   
   </style>
