<template>
    
    <div id="limitSearch">
        <p id="checkboxHeading">{{ heading }}</p>
        <form action="" :class="checkboxcolour">
            <div v-for="elem in subCat" :key="elem">
                <label> {{elem}}
                <input type="checkbox" :id="elem" :name="elem" @change="boxChecked(elem)" v-model="activeFilters" :value="elem">
                <span></span>
                </label>
            </div>
        </form>
    </div>
</template>

<script>

export default {
  name: 'LimitSearch',
  props: {
    checkboxcolour: String,
    heading: String,
    subCat: Array,
    activeFilters: Array,
    
  },   
  methods:{
      boxChecked(elem){
          this.$emit("checkbox", elem)
      }
  }
}
</script>


<style scoped>
/* PLEASE ikke glem "scoped"-taggen, brukte 10 min på å debugge */

    #checkboxHeading{
        font-size: 1.2em;
        font-weight: bold;
        font-family: 'Avenir', Helvetica, Arial;
        margin-bottom: 0.5em;
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
    left: 8px;
    top: -2px;
    width: 9px;
    height: 16px;
    border: solid #3b3367;
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