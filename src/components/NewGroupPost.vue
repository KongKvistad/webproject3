<template>
    <div>
    <p @click="modalShowing = true" class="w-24 h-8 rounded flex justify-center items-center bg-blue-600 font-bold text-white ml-auto mr-16 mt-12 "> New post</p>
    <Modal v-if="modalShowing" @close="modalShowing = false">
        <h2 slot="header">New Post</h2>
        <div slot="modal-body" class="box w-full flex flex-col items-between" >
            <div class="box-wrapper grid grid-cols-1 grid-rows-1">
                <input v-model="postName" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="Title.." class="w-full shadow-sm border border-gray-300 p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
            </div>
            <div class=" mt-8 box-wrapper flex">
                <textarea v-model="postCont" name="" id="" @keydown.enter="PLACEHOLDER" placeholder="Content" class="w-full h-40 shadow-sm border border-gray-300 p-5 pl-4 text-sm outline-none focus:outline-none bg-transparent">
                </textarea>
            </div>
            <button @click="submit()" class="w-32 h-8 rounded bg-blue-600 font-bold text-white ml-auto mr-2 mt-8">Submit</button>
        </div>
    </Modal>
    </div>
</template>
<script>

import Modal from "@/components/Modal.vue"
import {createPost} from "@/helpers/create.js"


export default {
    name:"NewGroupPost",
    props:["userId", "groupId"],
    components: {
        Modal
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

            createPost(this.postName, this.postCont, this.userId, this.groupId).then(() => {
                 scope.modalShowing = false
                 scope.$router.go(this.$router.currentRoute)
            })
        }
            
    },
    created(){
       
        
    }
}

</script>

<style scoped>

</style>