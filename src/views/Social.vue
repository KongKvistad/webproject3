<template>
    <MainLayout>
        <template 
        v-slot:leftBar>
        <CatChooser
            :heading="'Experience'"
            :cats="cats"
            :activeCat="activeCat"
            v-on:catsChanged="onCatsChange"/>
        <LimitSearch
                checkboxcolour="bluecheckbox"
                heading="Engagement type" 
                choice1="Internship" 
                choice2="Short term" 
                choice3="Long term"/>
        </template>
        <template v-slot:discoverheading>
            <SearchMaster
                v-on:catsChanged="onCatsChange"
                :results="results"
                :cats="cats"
                :activeCats="activeCat"
                :activeFilters="activeFilters"
                />
               
        </template>
        <template v-slot:cards v-if="!compoundView">
               <!--cards for regular search-->
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
                    imageBox="Internship" 
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"
                    boxcolourclass="bluebox"
                    />
            
        </template>
        <template v-slot:cards v-else>
           
               <!--cards for comp view-->
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
                    imageBox="Internship" 
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"
                    boxcolourclass="bluebox"
                    />
                
            </template>
            
        </template>
        <template v-slot:rightBar>
        <Button
        title="New group"
        :uid="userProfile.uid"
        />
        </template>
    </MainLayout>
</template>
<script>
import MainLayout from "./MainLayout.vue"
import CatChooser from "../components/CatChooser.vue"
import LimitSearch from "../components/limitSearch.vue"
import SearchMaster from "../components/SearchMaster.vue"
import Card from "../components/Card.vue"
import Button from "../components/Button.vue"
import {mapState} from "vuex"
import {getPostByTerm, populateRandom, filtersWithHeaders, getCollections} from "../helpers/collections.js"



export default {
    name:"Social",
    components:{
       MainLayout,
       CatChooser,
       LimitSearch,
       SearchMaster,
       Card,
       Button
       
    },
    data() {
        return{
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
            this.activeCat = value
            this.activeFilters = [];
            this.populate(value)
        },
    },
    created(){
        let query = this.$route.query
        let activeCat= query.cat
        
        //if user came from search
        if(activeCat){
        
            this.activeCat=activeCat
        
            getPostByTerm(activeCat, query.searchTerm, query.type).then(res =>
                this.searchResults = res
        )
        //if user just pressed the navbar
        } else {
            this.compoundView = true
            populateRandom(["Events", "Groups"]).then(res => 
            this.searchResults = res
            )
        }
        
        //get pre-load data for SearchBar
        filtersWithHeaders("socialFilters").then(res => {
        
            this.filters = res
            this.cats = Object.keys(res)           
            activeCat? this.populate(this.activeCat) : this.populate("Work")
        
        });
        
    }

}
</script>
