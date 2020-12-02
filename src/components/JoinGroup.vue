<template>
    <div>
    <p @click="submit()" class="w-24 h-8 rounded flex justify-center items-center bg-blue-600 font-bold text-white ml-auto mr-16 mt-12 "> Join</p>
    </div>
</template>
<script>


import {updateMembers} from "@/helpers/create.js"


export default {
    name:"JoinGroup",
    props:["userId", "groupId"],
    components: {
        
    },
    
    data(){
        return {
            modalShowing: false,
            postName: "",
            postCont: ""
        }
    },
    computed:{
       

        
    },
    methods: {
        submit(){

            let scope = this
            updateMembers([this.userId], this.groupId, "add").then(() => {
                       scope.$router.go()
                    })
           
        }
            
    },
    created(){
       
        
    }
}

</script>

<style scoped>

</style>