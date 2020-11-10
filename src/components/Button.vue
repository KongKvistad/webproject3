<template>
    <div class="bg-gray-200 w-1/6 h-48 br-5 rounded flex flex-col justify-center items-center fixed">
        <p class="w-4/5 text-center mb-10">You can create a new group, man!</p>
    
        <button @click="$emit('showModal')" class="w-32 h-8 rounded bg-yellow-400 ">new +</button>
    
    </div>
</template>
<script>

import {createGroup} from '../helpers/group.js'


export default{
    name:"Button",
    props:["title", "uid"],
    components: {
       
    },
    data(){
        return{
            
        }
    },
    methods:{
        logger(){
            createGroup()
        }
        
    }
}

</script>
