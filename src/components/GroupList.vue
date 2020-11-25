<template>
    <ul v-if="groupData" class="groupBox">
        <li class="groupHead">My groups</li>
        <li @click="navigate(group.id)" class="group" v-for="group in groupData" :key="group.Title" >
            <span> > </span>
            <p>{{group.Title}}</p>
        </li>
    </ul>
    <p v-else>loading...</p>
</template>
<script>

import {multipleDocs} from "@/helpers/collections.js"



export default {
    name:"GroupList",
    props:["belongsTo"],
    
    data(){
        return {
            groupData: null
        }
    },
    computed:{
       

        
    },
    methods: {
        fetchData(){
            multipleDocs(this.belongsTo, "Groups").then(res=>{
                this.groupData = res.filter(x => x!= undefined);
            })
        },
        navigate(id){
            if(this.$route.name == "social"){
             this.$router.push({ name: 'group', params: { id: id } })
             }
        },
            
    },
    watch:{
        belongsTo(){
            this.fetchData()
        }
    },
    created(){
        
            this.fetchData()
        
        
       
        
    }
}

</script>

<style scoped>
.groupBox{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 22em;
    max-width: 14%;
    width: 16%;
}
.group{
    display: flex;
   
    padding:5px 2px;
    margin-bottom:10px;
    background-color: #fbe770;
    box-shadow: 3px 3px 7px 0px #dedede;
 

}

.group:hover > p{
    color: black;
}

.group > span{
    flex-basis:15%;
  
    margin: 0px 2%;
    display: flex;
    justify-content:center;
    align-items:center;

}

.group > p{
    padding-left: 5px;
    flex-basis:78%;
    color: #808080;
  
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.groupHead{
    font-size: 1.2em;
    font-weight: bold;
    font-family: 'Avenir', Helvetica, Arial;
    margin-bottom: 1em;
}


</style>