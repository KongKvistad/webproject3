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
            <h1>Marketplace</h1>
            <form id="search" action="">
                <input type="text" name="search" placeholder="Search...">
            </form>
        </div>
            <div id="cards">
                <Card title="How to write a good application" 
                    owner="John Hopkins" 
                    description="How should you present yourself, and what is important to mention? Learn how to write the best possible application for an internship, job etc." 
                    reviews=2 
                    imageLink="https://mendeleyblog.files.wordpress.com/2017/06/writingatdesk.jpg?w=810"/>
            
                <Card title="Essential strategies and skills" 
                    owner="Sarah Berg"  
                    description="Its essential to have good skills in everything you do. A great self esteem is always handy, am I right?." 
                    reviews=57 
                    imageLink="https://www.marketing91.com/wp-content/uploads/2020/03/Essential-Skills.jpg"/>

                <Card title="PHP programmer" 
                    owner="UCLA" 
                    description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." 
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