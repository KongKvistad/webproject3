<template>

  <div id="card">
      <div id="left-column">
       <img :src=imageLink :alt=altText>
       <div id="imageBox" :class=boxcolourclass>
       <!-- denne kan legges på imagediv for å style-> :style= "[imageBox == 'Internship' ? {'background-color': '#5E80F8'} : {'background-color': '#fff'}]"-->
       <!--<div id="imageBox">-->
        <p>{{ imageBox }}</p>
       </div>
      </div>

      <div id="right-column">
          <h2>{{ title }}</h2>
          <p>{{ owner }}</p>
          <p v-if="deadline" id = "deadline">Deadline: {{ deadline }}</p>
          <p>{{ description }}</p>
          <div id="liste">
                <p v-if="price">{{ price }}k</p>
                <p v-if="reviews">{{ reviews }} testemonies</p>
                <p v-if="duration">{{ duration }} weeks</p>
                <p v-if="ecoursetime>60" > {{ ecoursetime/60 }} hours </p>
                <p v-else-if="ecoursetime<60"> {{ecoursetime}} minutes</p>
        
          </div>
      </div>
  </div>
</template>

<script>


export default {
  name: 'Card',
  props: {
    name: String,
    title: String,
    aboutMe: String,
    location: String
  },
  components: {
    
  },
  methods: {

  }
  
}
</script>

<style scoped>

.bluebox {
      background-color: rgb(29, 103, 187);
    }
.greenbox {
    background-color: rgb(13, 170, 86);
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
}


#card {
    display: flex;
    flex-direction: column;
    flex-flow: row;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  /*border: 1px solid rgb(162, 162, 162);*/
}
#card:hover{
    border: 1px solid #00000047;
    box-shadow: 2px 3px 6px #00000073;

}
#left-column {
    max-width: 30%;
    position: relative;
}
#right-column {
  padding: 0 2%;
    width: 70%;
}
#left-column img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
}
#deadline, #liste {
  font-weight: bold;
}
#liste {
  
    display: flex;
    justify-content: space-between;
}

h1 {
  font-size: 1.7em;
}
h2 {
  font-size: 1.5em;
}

p {
  font-size: 1em;
}


</style>