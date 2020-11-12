<template>
    <div class="bg-gray-200 w-1/6 h-48 br-5 rounded flex flex-col justify-center items-center fixed">
        <p class="w-4/5 text-center mb-10">{{desc}}</p>
    
        <button @click="$emit('showModal')" class="w-32 h-8 rounded" v-bind:style="{'background-color': color}">new +</button>
    
    </div>
</template>
<script>

import {determineColor} from "../helpers/color.js"

export default{
    name:"Button",
    props:["title", "uid", "desc"],
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
