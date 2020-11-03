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
                    :imageBox="elem.Type" 
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"
                    boxcolourclass="yellowbox"
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
                    :imageBox="elem.Type"  
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"
                    boxcolourclass="yellowbox"
                    />
                
            </template>
            
        </template>
        <template v-slot:rightBar>
        <Button v-on:showModal="modalShowing = true"/>
        <Modal v-if="modalShowing" @close="modalShowing = false">
            <h2 slot="header">Create a group</h2>
            <GroupForm slot="modal-body" :user="userProfile" @closeModal="modalShowing = false"/>
        </Modal>
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
import Modal from "../components/Modal.vue"
import GroupForm from "../components/GroupForm.vue"
import {mapState} from "vuex"
import {getPostByTerm, populateRandom, filtersWithHeaders, getCollections, getAllByTerm} from "../helpers/collections.js"



export default {
    name:"Social",
    components:{
       MainLayout,
       CatChooser,
       LimitSearch,
       SearchMaster,
       Card,
       Button,
       Modal,
       GroupForm
       
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
        filtersWithHeaders("socialFilters").then(res => {
            
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
