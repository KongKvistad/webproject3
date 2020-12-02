<template>
    <MainLayout :padding="false">
        <template 
        v-slot:leftBar>
       

        </template>
        <template v-slot:discoverheading>
            <div class="bgCanvas">
                <img class="backGround" :src="eventData.imgUrl"/>
                <h1>{{eventData.Title}}</h1>
                <div class="desc">
                    <em>Description:</em>
                    <p>{{eventData.Description}}</p>
                </div>
            </div>
        </template>
        <template v-slot:cards >
            <div class="eventData">    
                <h2 class="happening">Happening the</h2>
                <h3 class="date">{{eventData.EventDate}}</h3>
                <p class="in">in</p>
                <h3 class="location">{{eventData.City}}, {{eventData.Country}}</h3>
            </div>

               
        </template>
       
        <template v-slot:rightBar>
         
        </template>
        
    </MainLayout>
</template>
<script>
import MainLayout from "./MainLayout.vue"

import {getDocByReference} from "@/helpers/collections.js"
import {mapState} from "vuex"

export default {
    name:"group",
    components:{
       MainLayout,
    
       
       
    },
    data(){
        return {
            eventData: false,
            members: false,
            posts: false
        }
    },
    computed:{
        ...mapState(['userProfile']),

        
    },
    methods: {
        
            
    },
    created(){
        let id = this.$route.params.id
        getDocByReference("Events", id).then(res => {
            console.log(res)
            this.eventData = res
            
            
            
        })
        

       
        
    }
}

</script>

<style scoped>
.bgCanvas{
    position: relative;
    display: flex;
    height: 24em;
    width:100%;
    margin-bottom:5em;
    
}

.bgCanvas > h1{
    position: absolute;
    background-color: #f4e58c;
   
    top: 65%;
    left: 2%;
    padding: 7px 2em 0px 20px;
    font-family: 'Avenir';
    font-size: 2em;
    font-weight: 800;
    text-transform: uppercase;
    color: black;
}

.backGround{
    object-fit: cover;
    width:inherit;
}
.desc{
    padding: 1em 0px 1em 20px;
    background-color: #f4e58c;
    position: absolute;
    top:84%;
    left: 2%;
    color: black;
    font-family: 'Avenir';
    max-width: 30em;
}
.desc > p{
    font-size: 1em;
    max-width: 90%;
    
    
    

}
.desc >em{
    font-size: 1.2em;   
    font-weight: bold;
    font-style: normal;
    
    
}

.eventData{
    margin-top:4em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    font-family: 'Avenir';

}
.happening{
    font-size: 1.4em;
}
.date{
    font-size:2em;
    font-weight: bold;
}
.in{
    font-size: 1.5em;
}
.location{
    font-size:2em;
    font-weight: bold;
}

</style>