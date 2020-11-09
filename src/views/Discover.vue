<template>
<div id="discover">
    <section id="leftBar">
        <div>
        <!--
            <LimitSearch
                checkboxcolour="bluecheckbox"
                heading="Experience" 
                choice1="Work" 
                choice2="Study programme" 
                choice3="Exchange"/>
        -->
            <CatChooser
            :heading="'Experience'"
            :cats="cats"
            :activeCat="activeCat"
            v-on:catsChanged="onCatsChange"

            />
            <template v-for="cat in filters">
                <LimitSearch
                :key="cat.uid"
                checkboxcolour="bluecheckbox"
                :heading="cat.uid" 
                choice1="Internship" 
                choice2="Short term" 
                choice3="Long term"/>

            </template>
            
        </div>
      <!-- searchboxes   -->
    </section>
    
    <section id="middleBar">
        <div id="discoverheading">
            <SearchMaster
                v-on:catsChanged="onCatsChange"
                :results="results"
                :cats="cats"
                :activeCats="activeCat"
                :activeFilters="activeFilters"
                />
        </div>
            <div id="cards" v-if="!compoundView">
                
               <Card
                    :key="idx" 
                    v-for="(elem,idx) in searchResults"
                    :title="elem.Title" 
                    :owner="elem.School" 
                    :deadline="elem.Visa"
                    :description="elem.Description" 
                    :price="elem.Cost" 
                    :reviews="elem.Testemonies" 
                    :duration="elem.Duration"
                    :imageBox="elem.Type" 
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"
                    boxcolourclass="bluebox"
                    />
            
              
            </div>
            <div id="cards" v-else>
                <template v-for="(elem,idx) in searchResults" >
                <div v-if="elem.isLast" :key="elem.Title+idx" class="newCat">
                    <h3>{{elem.isLast}}</h3>
                </div>
               <Card
                    :key="elem.Title+idx+'cmp'"
                    :title="elem.Title" 
                    :owner="elem.School" 
                    :deadline="elem.Visa"
                    :description="elem.Description" 
                    :price="elem.Cost" 
                    :reviews="elem.Testemonies" 
                    :duration="elem.Duration"
                    :isLast="elem.isLast"
                    :imageBox="elem.Type" 
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"
                    boxcolourclass="bluebox"
                    />
                
            </template>
              
            </div>

    </section>
    <section id="rightBar">
        <!--Bare satt det inn her for å se litt på grid-->
        <div>
            <!--
            <LimitSearch 
                heading="Experience" 
                choice1="Work" 
                choice2="Study programme" 
                choice3="Exchange"/>
            <LimitSearch 
                heading="Engagement type" 
                choice1="Internship" 
                choice2="Short term" 
                choice3="Long term"/>
                -->
        </div>
    </section>
</div>
</template>
<script>
import Card from "../components/Card.vue";
import LimitSearch from "../components/limitSearch.vue";
import SearchMaster from "../components/SearchMaster.vue"
import CatChooser from "../components/CatChooser.vue"
import {mapState} from "vuex"
import {getPostByTerm, populateRandom, filtersWithHeaders, getCollections, getAllByTerm} from "../helpers/collections.js"
export default {
    name:"Discover",
    components:{
        LimitSearch,
        Card,
        SearchMaster,
        CatChooser
       
    },
    data() {
        return{
            modalShowing: false,

            searchResults: false,
            activeCat: false,
            compoundView: false,
            //data for pre-search
            results:false,
            cats: [],
            
            filters: [],
            activeFilters:[],
        }
    },
    computed: mapState(['userProfile']),
    methods:{
        
        populate: function(type){
            
            this.results = getCollections(type, true);
            
            
        },
        onCatsChange: function(value){
            let obj = {
                searchTerm: false,
                filters: false,
                cat: value,
                type: false
            }
            //double check this
            this.$router.push({ path: this.$route.path, query: obj }).then(this.$router.go(this.$router.currentRoute))
        },
    },
    created(){
        let query = this.$route.query
        let activeCat= query.cat == "false" || !query.cat ? false : query.cat
       

        //get pre-load data for SearchBar
        filtersWithHeaders("filters").then(res => {
            
            this.filters = res
            this.cats = Object.keys(res)    

            //if user has a selected category
            if(activeCat){
                
                this.activeCat=activeCat
            
                getPostByTerm(activeCat, query.searchTerm, query.type).then(res =>
                    this.searchResults = res     
                )

                this.populate(this.activeCat)
                
            // otherwise
            } else {
                //user may just have clicked the navbar
                
                if(query.searchTerm == "false" || !query.searchTerm){
                    
                    this.compoundView = true
                    
                    populateRandom([...this.cats]).then(res => 
                        this.searchResults = res
                    )

                    this.populate(this.cats)

                //or searched inn the "all"-category
                }else {

                    getAllByTerm(this.cats, query.searchTerm, query.type).then(res => 
                        this.searchResults = res
                    )

                    this.populate(this.cats)
                }
            }

 
        });
        
        
        
        
        
    }

   
}
</script>

<style scoped>
    /* .bluebox {
        background-color: #5E80F8;
    } */


    .newCat{
    border-bottom: 1px solid #8080805e;
    
    
    width: 35%;
    margin: 4em auto;
    }

    .newCat > h3{
        font-size: 2em;
    color: #5e80f8;
    text-align: center;
    margin-bottom: 10px;
    }

    #imageBox {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 100px;
    height: 40px;
    float:left;
    position: absolute;
    bottom: 0;
    left: 0;

    box-shadow: 2px 1px 5px #010;
    }
    
    #imageBox p {
        font-size: 20px;
    }
    #discoverheading {
        width: 100%;
        display:flex;
        align-items: center;
    }

    #discover{
        display: inline-grid;
        grid-template-columns: 170px auto 170px;
        grid-column-gap: 20px;
        margin: 2% 2%;
        width: calc(100vw - 5%);
    }
    #leftBar {
        grid-column: 1 / 2;
        position: fixed;
    }
    #middleBar{
        grid-column: 2 / 3;
        border-left: 1px solid rgb(177, 177, 177);
        border-right: 1px solid rgb(177, 177, 177);
        padding: 2%;
        max-width:50em;
        margin: 0px auto;
    }

    #rightBar{
        grid-column: 3 / 4;
        margin-right: 2%;
        right: 0;
        position: fixed;
    }

    #cards {
        margin-bottom: 50px;
    }

    #search input{
        width: 100%;
        height: 20px;
        border-radius: 40px;
        padding: 5px;
        border: none;
        background-color: rgb(240, 240, 240);
        color: black;
    }
    

    

</style>