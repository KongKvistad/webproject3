<template>
<ProfileLayout>
    <template v-slot:middleBar>
       <MyInfoCard></MyInfoCard>
    </template>   
</ProfileLayout>

</template>


<script>
import ProfileLayout from '@/components/profileComponents/ProfileLayout.vue';
import MyInfoCard from '@/components/profileComponents/MyInfoCard.vue';

export default {
    name: 'profileAbout',
    components:{
        ProfileLayout,
        MyInfoCard
    },
    data(){
        return{
            result: false,
            
        }
    },
    computed:{
        
    },

    created() {
        

    }
}
</script>


<style>


</style>