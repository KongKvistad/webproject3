<!--
    @desc Layout for the profile pages with menu on left side and content in the middle
-->

<template>
<div id="profile">
    <div id="leftBar">
        <!-- The menu to navigate the profile page -->
        <ProfileMenu></ProfileMenu>
    </div>


    <div class="middleBar">
        <slot name="middleBar"></slot>
    </div>

</div>
  
</template>

<script>
import ProfileMenu from '@/components/profileComponents/ProfileMenu';
export default {
    name: 'ProfileLayout',
    components: {
        ProfileMenu

    },

    data() {
        return {

        }
    },

    methods: {

    },
    
    computed: {

    }

}
</script>

<style scoped>
#profile{
    display: inline-grid;
    grid-template-columns: 170px auto 170px;
    grid-column-gap: 20px;
    margin: 5% 2%;
    width: 100%;
}

#leftBar {
    grid-column: 1 / 2;
    position: fixed;
}

.middleBar{
    grid-column: 2 / 3;
    border-left: 1px solid rgb(177, 177, 177);
    border-right: 1px solid rgb(177, 177, 177);
    padding: 2%;
}

#profileHeading {
    width: 100%;
    display: inline-grid;
    grid-template-columns: auto auto;
    align-items: center;
}

</style>