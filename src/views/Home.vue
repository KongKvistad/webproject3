<template>
  <main>
       <SearchBar/>
       <label class="select-none container block relative cursor-pointer text-xl pl-8">Option
        <input class="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" checked="checked">
        <span class="h-6 w-6 checkmark absolute top-0 left-0 bg-gray-400"></span>
        </label>
  </main>
</template>

<script>
//import db from '@/components/firebaseInit.js'
//import {getCollections} from '../helpers/collections.js'
import {db} from '../components/firebaseInit.js'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    SearchBar,
  },

  data(){
    return {
      results:[],
      cityOrCountry: false,
      resCount: 0
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
