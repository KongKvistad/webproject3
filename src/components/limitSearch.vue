<template>

    <div id="limitSearch">
        <p id="checkboxHeading">{{ heading }}</p>
        <form action="">
            <label> {{choice1}} 
            <input type="checkbox" id="choice1" name="choice1" value="">
            <span></span>
            </label>
            <label> {{choice2}} 
            <input type="checkbox" id="choice2" name="choice2" value="">
            <span></span>
            </label>
            <label> {{choice3}}
            <input type="checkbox" id="choice3" name="choice3" value="">
            <span></span>
            </label>
        </form>
    </div>
</template>

<script>

export default {
  name: 'LimitSearch',
  props: {
    heading: String,
    choice1: String,
    choice2: String,
    choice3: String,
    
  }
}
</script>

<style>


    #checkboxHeading{
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
    label input:checked ~ span {
        background-color: #2eaadc;
    } 
</style>