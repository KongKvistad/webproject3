<template>
<div id="profile">
    <section id="leftBar">
        <div>
            <p class="menuHeading">Profile</p>
            <ul>
                <li><a>About Me</a></li>
                <li><a>Favorites</a></li>
            </ul>
        </div><br>
        <div>
            <p class="menuHeading">Settings</p>
            <ul>
                <li><a>General</a></li>
                <li><a>Security</a></li>
                <li><a>Privacy</a></li>
                <li><a>Notifications</a></li>
                <li><a>Invite Friends</a></li>
            </ul>
            
        </div>
    </section>
    
    <section id="middleBar">
        <div id="profileHeading">
            <h1>Profile</h1>
        </div>
            <div id="cards">
                
               <ProfileCard
                    :key="idx" 
                    v-for="(elem,idx) in results"
                    :title="elem.Title" 
                    :owner="elem.School" 
                    :deadline="elem.Visa"
                    :description="elem.Description" 
                    :price="elem.Cost" 
                    :reviews="elem.Testemonies" 
                    :duration="elem.Duration"
                    imageBox="Internship" 
                    imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg"
                    boxcolourclass="bluebox"
                    />
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
import ProfileCard from "../components/ProfileCard.vue";
import LimitSearch from "../components/limitSearch.vue";
import {getCollections} from "../helpers/collections.js"
export default {
    name:"Discover",
    components:{
        LimitSearch,
        ProfileCard
    },
    data(){
        return{
            results: false,
            activeCat: false
        }
    },
    computed:{
        
    },
    created(){
        //console.log(this.$route.query.filters.split("+"))
        let activeCat= this.$route.query.cat
        this.activeCat=activeCat
        this.results = getCollections(activeCat, true);
        
        
    }

   
}
</script>

<style>
    /* .bluebox {
        background-color: #5E80F8;
    } */

    #imageBox {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 100px;
    height: 40px;
    float:left;
    position: absolute;
    bottom: 0;
    left: 0;
    box-shadow: 2px 1px 5px #010;
    }
    
    #imageBox p {
        font-size: 20px;
    }
    #profileHeading {
        width: 100%;
        display: inline-grid;
        grid-template-columns: auto auto;
        align-items: center;
    }

    #profile{
        display: inline-grid;
        grid-template-columns: 170px auto 170px;
        grid-column-gap: 20px;
        margin: 5% 2%;
        width: 90%;
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

    .menuHeading{
        font-size: 1.2em;
        font-weight: bold;
    }

    
    label{
        cursor: pointer;
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 10px;
    }
    /*Hiding the defualt boxes to make custom ones*/
    label input[type=checkbox] {
        position: absolute; /*prevents it taking up space*/
        opacity: 0;
        height: 0;
        width: 0;
    }
    label span {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #ddd;
    }
    label:hover span {
        background-color: #ccc;
    }
    /*creating the check icon itself*/
    label span:after {
        /* saying its hidden when not checked*/
        content: "";
        position: absolute;
        display: none;

        /*styling the icon*/
        left: 6px;
        top: 2px;
        width: 4px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
    /*when checked, show the check icon*/
    label input:checked ~ span:after {
        display:block;
    }
    /*with a blue background*/
    .bluecheckbox label input:checked ~ span {
        background-color: #2eaadc;
    } 

    .greencheckbox label input:checked ~ span {
        background-color: #36A90F;
    } 
    

    

</style>