<template>
<div id="discover">
    
        <section id="leftBar">
            <div>
                <slot name="leftBar"></slot>
            </div>
    
        </section>
    
    <section id="middleBar" :style="this.padding ? 'padding: 3%' : 'padding: 0%'">
        <div id="discoverheading">
            <slot name="discoverheading">
                <!--top spot-->
                
            </slot>
        </div>
        
        <div id="cards"> 
            <slot name="cards"></slot>
        </div>

    </section>
    <section id="rightBar">
       
        <slot name="rightBar">
            <!--
            ads/ other stuff
                -->
            </slot>
    
    </section>
</div>
</template>
<script>

//import {getPostByTerm, populateRandom, filtersWithHeaders, getCollections} from "../helpers/collections.js"


export default {
    name:"MainLayout",
    props:["padding"],
    components:{
        
    },
    
    

}



</script>
<style scoped>
    /* .bluebox {
        background-color: #5E80F8;
    } */


    .newCat{
    border-bottom: 1px solid #8080805e;
    
    
    width: 35%;
    margin: 4em auto;
    }

    .newCat > h3{
    font-size: 2em;
    
    text-align: center;
    margin-bottom: 10px;
    }

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
    #discoverheading {
        width: 100%;
        display:flex;
        align-items: center;
        
    }

    #discover{
        display: inline-grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-column-gap: 20px;
        margin: 2% 2%;
        width: calc(100vw - 5%);
    }
    #leftBar {
        grid-column: 1 / 2;
        
        margin-left: 18%;
    }
    #middleBar{
        grid-column: 2 / 3;
        border-left: 1px solid rgba(177, 177, 177, 0.2);
        min-width:100%;
        max-width:50em;
        margin: 0px auto;
    }

    #rightBar{
        grid-column: 3 / 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
    #rightBar > div:first-of-type {
        max-width: 14%;
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