<template>

    <div id="limitSearch">
        <p id="checkboxHeading">{{ heading }}</p>
        <form action="">
            <input type="checkbox" id="choice1" name="choice1" value="">
            <label for="choice1"> {{choice1}} </label>
            <input type="checkbox" id="choice2" name="choice2" value="">
            <label for="choice2"> {{choice2}} </label>
            <input type="checkbox" id="choice3" name="choice3" value="">
            <label for="choice3"> {{choice3}} </label>
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

    form{
        display: grid;
        grid-template-areas: "i l";
    }
    input{
        grid-area: i;
    }
    label{
        grid-area: l;
    }

</style>