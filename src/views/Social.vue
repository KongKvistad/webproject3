<template>
    <MainLayout :padding="true">
        <template 
        v-slot:leftBar>
        <CatChooser
            :heading="'Social'"
            :cats="cats"
            :activeCat="activeCat"
            v-on:catsChanged="onCatsChange"/>
        
        <CheckBoxMaster
        v-for="cat in derivedFilters"
        :key="cat.uid"
        :cats = "cat"
        v-on:checkbox="checkboxes"
        :activeFilters="activeFilters"
        
   
        />

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
                    :type="elem.Type"
                    :key="idx" 
                    v-for="(elem,idx) in searchResults"
                    :id ="elem.id"
                    :title="elem.Title" 
                    :owner="elem.School" 
                    :deadline="elem.Visa"
                    :description="elem.Description" 
                    :price="elem.Cost" 
                    :reviews="elem.Testemonies" 
                    :duration="elem.Duration"
                    :imageBox="elem.Type" 
                    :imageLink="elem.imgUrl ? elem.imgUrl : 'https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg'"
                    boxcolourclass="yellowbox"
                    />
            
        </template>
        <template v-slot:cards v-else>
           
               <!--cards for comp view-->
               <template v-for="(elem,idx) in searchResults" >
                <div v-if="elem.isLast" :key="elem.Title+idx" class="newCat">
                    <h1 v-bind:style="{'color': '#333333'}">{{elem.isLast}}</h1>
                </div>
               <Card
                    :type="elem.Type"
                    :key="elem.Title+idx+'cmp'"
                    :id ="elem.id"
                    :title="elem.Title" 
                    :owner="elem.School" 
                    :deadline="elem.Visa"
                    :description="elem.Description" 
                    :price="elem.Cost" 
                    :reviews="elem.Testemonies" 
                    :duration="elem.Duration"
                    :isLast="elem.isLast"
                    :imageBox="elem.Type"  
                    :altText="elem.altText"  
                    :imageLink="elem.imgUrl ? elem.imgUrl : 'https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg'"
                    boxcolourclass="yellowbox"
                    />
                
            </template>
            
        </template>
        <template v-slot:rightBar>
        <div class="buttonList">
            <Button v-if="activeCat == false || activeCat == 'Events'" desc="Create an Event!" :modalToOpen="'Events'"  v-on:showModal="setActiveModal"/>
            <Button v-if="activeCat == false || activeCat == 'Groups'" desc="Create a group!"  :modalToOpen="'Groups'" v-on:showModal="setActiveModal"/>
        </div>
        <Modal v-if="modalShowing && activeModal == 'Groups'" @close="modalShowing = false">

            <h2 slot="header">Create a group</h2>
            <GroupAndEventForm v-if="userProfile.id" slot="modal-body" :user="userProfile" :params="decideParams(cats[1])" :type="cats[1]" @closeModal="postCreated"/>

            <AccessDenied v-else slot="modal-body" @closeModal="modalShowing = false"/>

        </Modal>
        <Modal v-else-if="modalShowing && activeModal == 'Events'" @close="modalShowing = false">

            <h2 slot="header">Create an Event</h2>
            <GroupAndEventForm v-if="userProfile.id" slot="modal-body" :user="userProfile" :params="decideParams(cats[0])" :type="cats[0]" @closeModal="postCreated"/>

            <AccessDenied v-else slot="modal-body" @closeModal="modalShowing = false"/>

        </Modal>
        <GroupList v-if="userProfile.id"
        :belongsTo="userProfile.belongsTo"/>
        </template>
        
    </MainLayout>
</template>
<script>
import MainLayout from "./MainLayout.vue"
import CatChooser from "../components/CatChooser.vue"
import SearchMaster from "../components/SearchMaster.vue"
import Card from "../components/Card.vue"
import Button from "../components/Button.vue"
import Modal from "../components/Modal.vue"
import GroupAndEventForm from "../components/GroupAndEventForm.vue"
import GroupList from "../components/GroupList.vue"
import CheckBoxMaster from "@/components/CheckBoxMaster.vue"
import {mapState} from "vuex"
import {getPostByTerm, populateRandom, filtersWithHeaders, getCollections, getAllByTerm} from "../helpers/collections.js"
import AccessDenied from '@/components/AccessDenied.vue'



export default {
    name:"Social",
    components:{
       MainLayout,
       CatChooser,
       CheckBoxMaster,
       SearchMaster,
       Card,
       Button,
       Modal,
       GroupAndEventForm,
       GroupList,
       AccessDenied
       
    },
    data() {
        return{
            modalShowing: false,
            activeModal: false,

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
    computed: {
        ...mapState(['userProfile']),
        
        
        derivedFilters(){
            const allFilt = this.$objFilter(this.filters, true)
            
            if(this.activeCat){
                return allFilt.filter(x => x.uid == this.activeCat)
            } else {
                return allFilt
            }


            
        },

    },
    methods:{
        decideParams(cat){
            const allFilt = this.$objFilter(this.filters, true)
            console.log(allFilt.filter(x => x.uid == cat))
            return allFilt.filter(x => x.uid == cat)

        },
        setActiveModal(val){
            console.log(val)
           this.modalShowing = true
           this.activeModal = val
        },

        
        postCreated(dataArr){
            let type = dataArr[0]
            let id = dataArr[1]
            console.log(type,id)
            this.modalShowing = false
            
           //pray to god nobody sees this
            this.$router.push({ name: type.split("s")[0].toLowerCase(), params: { id: id } })
        },
        checkboxes(value){
            if(this.activeFilters.indexOf(value) >=0 ){
                let index = this.activeFilters.indexOf(value)
                this.activeFilters.splice(index,1)
            } else {
                this.activeFilters.push(value)
            }
            
        },
        
        populate: function(type){
            
            this.results = getCollections(type, true);
            
            
        },
        onCatsChange: function(value){
            let obj = {
                searchTerm: false,
                filters: [],
                cat: value,
                type: false
            }
            //double check this
            this.$router.push({ path: this.$route.path, query: obj }).then(this.$router.go(this.$router.currentRoute))
        },
    },
    watch:{
        activeFilters: function() {
                this.$el.querySelector("#searchBar").focus({preventScroll: true});
        }
    },
    created(){
        let query = this.$route.query
        let activeCat= query.cat == "false" || !query.cat ? false : query.cat
        if(query.filters){
            
            let filters = query.filters.length > 0 ? query.filters.split("+") : false

            this.activeFilters = filters ? filters : []
        }
        
       

        //get pre-load data for SearchBar
        filtersWithHeaders("socialFilters").then(res => {
            
            this.filters = res
            this.cats = Object.keys(res)    

            //if user has a selected category
            if(activeCat){
                
                this.activeCat=activeCat
            
                getPostByTerm(activeCat, query.searchTerm, query.type, query.filters).then(res =>
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
                    console.log("this")

                    getAllByTerm(this.cats, query.searchTerm, query.type, query.filters).then(res => 
                        this.searchResults = res.flat()
                    )

                    this.populate(this.cats)
                }
            }

 
        });
        
        
        
        
        
    }

}
</script>

<style scoped>
.buttonList{
    display: flex;
    flex-direction: column;
    min-width: 14%;
    
}

.buttonList > div:first-of-type {
    margin-bottom: 2em;
}
</style>
