<template>
<div>
    <section id="leftBar">
      <!-- searchboxes   -->
    </section>
    <section id="middleBar">
        <Card/>
    </section>
</div>
</template>
<script>
import Card from "../components/Card.vue";
export default {
    components:{
        Card
    },
    created(){
        console.log(this.$route.query.filters.split("+"))
    }

   
}
</script>