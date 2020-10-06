<template>
<div id="marketplace">
    <section id="leftBar">
        <div>
            <LimitSearch 
                heading="Market" 
                choice1="E-courses" 
                choice2="Second hand" 
                choice3="Mentoring"/>
        </div>
      <!-- searchboxes   -->
    </section>
    <section id="middleBar">
        <div id="marketplaceheading">
            <h1>Discover</h1>
            <form id="search" action="">
                <input type="text" name="search" placeholder="Search...">
            </form>
        </div>
            <div id="cards">
                <Card title="Recording studio" 
                    owner="Jupiter Recordings" 
                    deadline="04.10.2020" 
                    description="You will get to join experienced recorders and have a lot of fun. We might even offer you a job." 
                    price=500 
                    reviews=2 
                    duration=26 
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"/>
            
                <Card title="Scientific findings" 
                    owner="NASA" 
                    deadline="21.05.2022" 
                    description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." 
                    price=700 
                    reviews=57 
                    duration=104 
                    imageLink="https://image.freepik.com/free-photo/front-view-scientist-holding-yellow-chemical_23-2148697236.jpg"/>

                <Card title="PHP programmer" 
                    owner="UCLA" 
                    deadline="21.05.2021" 
                    description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." 
                    price=300 
                    reviews=10 
                    duration=40 
                    imageLink="https://jaxenter.com/wp-content/uploads/2019/09/shutterstock_753972046-768x512.jpg"/>
            </div>
    </section>
    <section id="rightBar">
        <!--Bare satt det inn her for å se litt på grid-->
        <div>
            <LimitSearch 
                heading="Experience" 
                choice1="Work" 
                choice2="Study programme" 
                choice3="Exchange"/>
            <LimitSearch 
                heading="Engagement type" 
                choice1="Internship" 
                choice2="Short term" 
                choice3="Long term"/>
        </div>
    </section>
</div>
</template>
<script>
import Card from "../components/Card.vue";
import LimitSearch from "../components/limitSearch.vue";
export default {
    components:{
        Card,
        LimitSearch
    }

   
}
</script>

<style>

    #marketplaceheading {
        width: 100%;
        display: inline-grid;
        grid-template-columns: auto auto;
        align-items: center;
    }

    #marketplace{
        display: inline-grid;
        grid-template-columns: 170px auto 170px;
        grid-column-gap: 20px;
        margin: 5% 2%;
    }
    #leftBar {
        grid-column: 1 / 2;
        position: fixed;
    }
    #middleBar{
        grid-column: 2 / 3;
        border-left: 1px solid rgb(177, 177, 177);
        border-right: 1px solid rgb(177, 177, 177);
        padding: 2%;
    }

    #rightBar{
        grid-column: 3 / 4;
        margin-right: 2%;
        right: 0;
        position: fixed;
    }

    #cards {
        margin-bottom: 50px;
    }

    #search input{
        width: 100%;
        height: 20px;
        border-radius: 40px;
        padding: 5px;
        border: none;
        background-color: rgb(240, 240, 240);
        color: black;
    }
    

    

</style>