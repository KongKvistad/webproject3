<template>
<div id="marketplace">
    <section id="leftBar">
        <div>
            <LimitSearch 
                checkboxcolour="greencheckbox"
                heading="Market" 
                choice1="E-courses" 
                choice2="Second hand" 
                choice3="Mentoring"/>
        </div>
      <!-- searchboxes   -->
    </section>
    <section id="middleBar">
        <div id="marketplaceheading">
            <h1>Marketplace</h1>
            <form id="search" action="">
                <input type="text" name="search" placeholder="Search...">
            </form>
        </div>
            <div id="cards">
                <Card title="How to write a good application" 
                    owner="John Hopkins" 
                    description="How should you present yourself, and what is important to mention? Learn how to write the best possible application for an internship, job etc." 
                    imageLink="https://mendeleyblog.files.wordpress.com/2017/06/writingatdesk.jpg?w=810"
                    imageBox="30$" 
                    boxcolourclass="greenbox"
                    rating=1
                    ecoursetime=90 />
            
                <Card title="Essential strategies and skills" 
                    owner="Sarah Berg"  
                    description="Its essential to have good skills in everything you do. A great self esteem is always handy, am I right?." 
                    imageLink="https://www.marketing91.com/wp-content/uploads/2020/03/Essential-Skills.jpg"
                    imageBox="25$" 
                    boxcolourclass="greenbox"
                    rating=2
                    ecoursetime=15 />

                <Card title="Finding accomodation abroad" 
                    owner="Lisa Simpson" 
                    description="Its essential to know exactly what you are looking for when searching for a place to live during your semester away from home. I will teach you the do's and the dont's!" 
                    imageLink="https://pix10.agoda.net/hotelImages/747/7476707/7476707_19053021300074837521.jpg?s=1024x768"
                    imageBox="12.5$"
                    boxcolourclass="greenbox"
                    rating=5
                    ecoursetime=600 />
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

<style scoped>

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