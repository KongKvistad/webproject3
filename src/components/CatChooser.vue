<template>

    <div id="catChooser">
        <p id="CHHeading">{{ heading }}</p>
        <ul>
            <li @click="changeCat(cat)" :style="cat == activeCat ? activeStyle : 'color: black'" v-for="cat in cats" :key="cat">
            {{cat}}
            </li>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'CatChooser',
  props: [
    "heading",
    "cats",
    "activeCat"
    
  ],
  computed:{
      activeStyle: function(){
          return 'color: #5e80f8; text-decoration: underline;'
      }
  },
  methods:{
      changeCat: function(val){
      this.$emit('catsChanged', val)
    },
  }
}
</script>


<style scoped>
#CHHeading {
    font-size: 1.2em;
    font-weight: bold;
    font-family: 'Avenir', Helvetica, Arial;
    
}
#catChooser > ul{
    border-left: 2px solid #5e80f8;
    padding-left: 10px;
    margin-bottom:3em;
    
}
#catChooser > ul li {
    margin-bottom: 6px;
    font-family: 'Avenir', Helvetica, Arial;
}

#catChooser > ul li:hover{
    cursor: pointer;
}

#catChooser > ul li:first-of-type{
    margin-top: 5px;
}
</style>