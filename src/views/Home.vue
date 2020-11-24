<template>
    <main>
        <div class="banner-area">
          <div class="content-area">
            <div class="content">
              <!--DON'T DELETE ME YOU SILLY GOOSE
              <RadioBtns v-on:childToParent="onCatsChange" v-if="this.cats.length > 0" :cats="this.cats" :isHorizontal="true"/>-->
              <section class="w-full flex justify-between relative z-10">
                <SearchMaster
                v-on:catsChanged="onCatsChange"
                :results="results"
                :cats="cats"
                :activeCats="activeCats"
                :activeFilters="activeFilters"
                :fromHome="true"
                />
                <!--<FilterBox v-on:filterToSearch="onFilterChange"
                :filters="this.filters[this.activeCats]"
                v-if="this.activeCats" :isHorizontal="false"
                :activeFilters="activeFilters" />-->
              </section>
              <div class="headline">Opportunities abroad.</div>
              <div class="under-headline">Made easy.</div>
            </div>
          </div>
        </div>
        <div class="content-suggestion">
          
         <!--  <div>
            <Upload></Upload>
          </div> -->
        
          <h1>Maybe you're interested in these courses</h1>
          <!--<p>E-courses</p>-->
          <div class="smallCard">
            <SmallCard v-for="item in randomList(e_course).slice(0, 3)" :key="item.id" :item="item" :title="item.title" :price="item.price"/>            
          </div>
        </div>
    </main>
  </template>

<script>
import {getCollections, filtersWithHeaders} from '../helpers/collections.js'
import {db} from '../components/firebaseInit.js'
//import FilterBox from '../components/FilterBox'
import SearchMaster from '../components/SearchMaster.vue'
import SmallCard from '../components/SmallCard.vue'
//import Upload from '../components/Upload.vue'

export default {
  name: 'Home',
  components: {
    SearchMaster,
    //FilterBox,
    //RadioBtns,
    SmallCard,
    //Upload
  },

  data(){
    return {
      results:false,
      cats: [],
      activeCats:"",
      filters: [],
      activeFilters:[],
      e_course: [],
    }
  },
  
  methods: {
    // Randomly sorts list of e-courses for home page
    randomList: function(rand){
      return rand.slice().sort(function(){return 0.5 - Math.random()});
      },
    populate: function(type){
      this.results = getCollections(type, true);
    },

    onFilterChange: function(value){
     
      this.activeFilters = value
      //console.log(this.activeFilters)
      
    },
    onCatsChange: function(value){
      this.activeCats = value
      this.activeFilters = [];
      this.populate(value)
    },     
  },
  watch:{
    
  },
  created(){
    // initialize values
    console.log(this.$route)
   
    filtersWithHeaders("filters").then(res => {
    
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
          'title': doc.data().Title,
          'price': doc.data().Price,
          'imgUrl': doc.data().imgUrl,
          'description': doc.data().Description
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
     padding: 0.2rem;
     margin-top: 2rem;
     font-size: 4vw;
     background-color: rgb(0,0,0,0.5);
     color: white;
     text-align: left;
     position: absolute;
     top:1em;
     font-family: "Open Sans", sans-serif;
   }
   
   .under-headline {
     padding: 0.5rem;
     margin-top: 1rem;
     font-size: 2vw;
     float: left;
     background-color: rgb(0,0,0,0.5);
     color: white;
     text-align: left;
     font-family: "Open Sans", sans-serif;
     position: absolute;
     top:6em;
   }
   
   
   /* Content suggestions */
   
   .content-suggestion {
      background-color: rgb(128,128,128,0.1)
    }

    .content-suggestion > h1 {
      font-size: 33px;
      padding: 2%;
      font-family: "Open Sans", sans-serif;
      margin-bottom: 3%;
      color: #333333;
    }
   
   .smallCard {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex-basis: 100%;
      justify-content: space-evenly;
   }

  
   
   </style>
