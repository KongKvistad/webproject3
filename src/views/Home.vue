<template>
    <main>
        <div class="banner-area"> <!-- :style="image">  Virker til å vise bilde på vue måten men da virker ikke css'en-->
          <div class="content-area">
            <div class="content">
              <SearchBar/>
              <!-- Checkbox
              <label class="select-none container block relative cursor-pointer text-xl pl-8">Option
                  <input class="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" checked="checked">
                  <span class="h-6 w-6 checkmark absolute top-0 left-0 bg-gray-400"></span>
              </label>
              -->
              <div class="headline">Opportunities abroad.</div>
              <div class="under-headline">Made easy.</div>
            </div>
          </div>
        </div>
  
  
        <div class="content-suggestion">
          <h1>Maybe you're interested in...</h1>
          <p>E-courses</p>
          <!--
          <div class="content-suggestion-cards">
            <div v-for="item in placeholder" :key="item.id" >
              <p>{{ item.id }} </p>
              <p>{{ item.content }}</p>
              <p> {{ item.price }}</p>
            </div>
          </div>
        -->
          <div class="smallCard">
            <SmallCard v-for="item in placeholder" :key="item.id" :item="item"/>
          </div>
        </div>
        
        

    </main>
  
  </template>

<script>
//import db from '@/components/firebaseInit.js'
//import {getCollections} from '../helpers/collections.js'
import {db} from '../components/firebaseInit.js'
import SearchBar from '../components/SearchBar.vue'
//import EngagementTypeBox from '../components/EngagementTypeBox.vue'
import SmallCard from '../components/SmallCard.vue'

export default {
  name: 'Home',
  components: {
    SearchBar,
    SmallCard,
    //EngagementTypeBox,
  },

  data(){
    return {
      results:[],
      cityOrCountry: false,
      resCount: 0,
      //image: {
      //  backgroundImage: `url(${require('@/assets/students-park.jpg')})`
      //},
      placeholder: [ 
        { id: 1, img: '@/assests/logo.png', content: 'How to write a good application for Uni and stuff..', price: '34' },
        { id: 2, img: '@/assests/logo.png', content: 'How to write a good application for Uni and stuff..', price: '34' },
        { id: 3, img: '@/assests/logo.png', content: 'How to write a good application for Uni and stuff..', price: '34' }
      ]
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

       
      }
      //We call the asychronous function
     
  },
  created(){
    
     this.getIsCapitalOrCountry().then(result => {
        result.forEach(docSnapshot => {
          console.log(docSnapshot.data());
        });
      });
    
  
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
   
  

   .content-suggestion-cards {
      
    }
   
   .smallCard {
     display: flex;
     flex-direction: columns;
   }
   
   </style>
   