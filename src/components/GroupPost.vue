<template>
    <div class="post">
        <h3>{{data.Title}}</h3>
        <span class="creator">
            <em>By: {{creator}}</em>
        </span>
        <p class="desc">{{data.Desc}}</p>
    </div>
</template>
<script>

//import {getDocByReference, multipleDocs} from "@/helpers/collections.js"



export default {
    name:"posts",
    props:["data", "creator"],
    
    data(){
        return {
            
        }
    },
    computed:{
       

        
    },
    methods: {
        
            
    },
    created(){
       
        
    }
}

</script>

<style scoped>
.post{
    margin: 0px auto;
    margin-top: 2em;
    max-width: 70%;
    border: 1px solid #e2e2e2;
    border-radius:5px;
    padding: 1em;
    
}
.post > h3{
    color: black;
    font-family: 'Avenir';
    font-size: 1.4em;
    font-weight: 800;
     margin-bottom:5px;
}
.creator{
  
}
.creator > em{
    font-family: 'Avenir';
    font-weight: 800;
    text-transform: capitalize;
}
.desc{
    margin-top:15px;
}
</style>