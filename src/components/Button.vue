<template>
    <div class="bg-gray-200 w-full h-48 br-5 rounded flex flex-col justify-center items-center">
        <p class="w-4/5 text-center mb-10">{{desc}}</p>
    
        <button @click="$emit('showModal', modalToOpen)" class="w-32 h-8 rounded" v-bind:style="{'background-color': color}">new +</button>
    
    </div>
</template>
<script>

import {determineColor} from "../helpers/color.js"

export default{
    name:"Button",
    props:["title", "uid", "desc", "modalToOpen"],
    components: {
       
    },
    data(){
        return{
            
        }
    },
    computed: {
        color(){
             return determineColor(this.$route.name)
        }
    },
    methods:{
        
        
    }
}

</script>

<style scoped>

 .modal {
    background:  rgb(237,242,247);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 40vh;
    border-radius: 5px;
    position: absolute;
    width: 400px;
 }
</style>

<!--class="bg-gray-200 w-1/6 h-48 br-5 rounded flex flex-col justify-center items-center fixed"-->