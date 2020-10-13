<template>
<div>
    <section id="leftBar">
      <!-- searchboxes   -->
    </section>
    <section id="middleBar">
        <Card/>
        <button id="show-modal" @click="showModal = true">Show Modal</button>
      <!-- use the modal component, pass in the prop -->
      <Modal v-if="showModal" @close="showModal = false">
        <h2 slot="header">How to get into uni</h2>
        
        <section slot="author">ola nordmann</section>
        <img :src="picture" slot="image"/>
                
        <section slot="parameters">{{["beginner", "4.4", "abc"]}}</section>
                
                
        <section slot="description">{{description}}</section>
                
                  
       
    
      </Modal>
    </section>
</div>
</template>
<script>
import Card from "../components/Card.vue";
import Modal from "../components/Modal.vue"
export default {
    data(){
        return{
            showModal: false,
            // these data are in reality fetched from the database
            picture: require("@/assets/smallCardImg.jpg"),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        }
        
    },
    components:{
        Card,
        Modal
    },
    created(){
        console.log(this.$route.query.filters.split("+"))
    }

   
}
</script>