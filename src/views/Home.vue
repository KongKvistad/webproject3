<template>
    <main>
        <div class="banner-area">
          <div class="content-area">
            <div class="content">
              <SearchBar/>
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
//import db from '@/components/firebaseInit.js'
//import {getCollections} from '../helpers/collections.js'
import {db} from '../components/firebaseInit.js'
import SearchBar from '../components/SearchBar.vue'
import SmallCard from '../components/SmallCard.vue'

export default {
  name: 'Home',
  components: {
    SearchBar,
    SmallCard
  },

  data(){
    return {
      results:[],
      cityOrCountry: false,
      resCount: 0,
      e_course: [],
    }
  },
  
  methods: {
    getIsCapitalOrCountry: async function(){

      let param = "spain"
      const citiesRef = db.collection('Work');
      let isACity = false;
      //We define an async function
      
        const isCity = citiesRef.where('city', '==', param).get();
        const isCountry = citiesRef.where('country', '==', param).get();
        const [capitalQuerySnapshot, italianQuerySnapshot] = await Promise.all([
          isCity,
          isCountry
        ]);
        const CitiesArray = capitalQuerySnapshot.docs;
       
        const countryArray = italianQuerySnapshot.docs;

        isACity = CitiesArray.length > 0 ? true : false;
         console.log("is city?", isACity)
        const result = CitiesArray.concat(countryArray);
        this.resCount = result.length;
        return result;

       
      },    
      //We call the asychronous function
     
      // Sorting function for returning and displaying randomly picked e-courses on home page
    randomList: function(rand){
      return rand.slice().sort(function(){return 0.5 - Math.random()});
      },

  },

  created(){
    
     this.getIsCapitalOrCountry().then(result => {
        result.forEach(docSnapshot => {
          console.log(docSnapshot.data());
        });
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

  // smallCard click path for displaying full data in seperate view
  computed: {
    pathEcourse () {
      return this.$store.state.routePath.ecourse
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    main {
      width: auto;
      margin: auto;
      /*
       height: calc(100vh - 1em);
       width: 100vw;
       */
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
     margin-top: 20%;
     width: 60%;
   }
   
   
   .headline {
     padding-right: 1rem;
     padding-left: 1rem;
     margin-top: 2rem;
     font-size: 4vw;
     background-color: #5E80F8;
     color: white;
     text-align: left;
   }
   
   .under-headline {
     padding: 0.5rem;
     margin-top: 1rem;
     font-size: 2vw;
     float: left;
     background-color: #5E80F8;
     color: white;
     text-align: left;
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
   
   .smallCard {
     display: flex;
     flex-direction: columns;
   }
   
   </style>
   