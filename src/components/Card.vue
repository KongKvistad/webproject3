<template>

  <div @click="navigate(id, type)" id="card" :style="isLast ? 'margin-top: 30px;' : void(0)">
      <div id="left-column">
       <img :src=imageLink :alt=altText>
       <div id="imageBox" :class=boxcolourclass>
        <p>{{ imageBox }}</p>
       </div>
      </div>

      <div id="right-column">
          <h2>{{ title }}</h2>
          <div id="ownerInfo">
            <p v-if="owner">By {{ owner }}</p>
            <p v-if="timePosted">Posted {{ timePosted }}</p>
            <p v-if="country">&middot;</p>
            <p v-if="country">{{country}} </p>
            <p v-if="city">&middot;</p>
            <p v-if="city">{{city}} </p>
            <p v-if="language">&middot;</p>
            <p v-if="language">Language: {{language}}</p>
          </div>
          <p v-if="deadline" id = "deadline">Deadline: {{ deadline }}</p>
          <p v-if="terms">Terms of stay: {{terms}}</p>
          <p>{{ description }}</p>

          <div id="liste">
                <p v-if="price>0" :style= "[imageBox == 'Second Hand' ? {'color': 'green', 'font-size': '1.5em'} : {}]">{{ price }}$</p>
                <p v-else-if="price==0" :style= "price==0 ? {'color': 'green', 'font-size': '1.5em'} : {}">FREE</p>
                <p v-if="reviews">{{ reviews }} testemonies</p>
                <p v-if="duration">{{ duration }} </p>
                <p v-if="type">Type: {{ type }}</p>
                <p v-if="ecoursetime>60" > {{ ecoursetime/60 }} hours </p>
                <p v-else-if="ecoursetime<60"> {{ecoursetime}} minutes</p>
                <div v-if="rating">
                  <star-rating v-model="rating" read-only=true @rating-selected ="setRating" star-size= 20></star-rating>
                </div>
          </div>
      </div>
      
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';


export default {
  name: 'Card',
  props: [
    "title",
    "country",
    "owner",
    "deadline",
    "description",
    "price",
    "reviews",
    "duration",
    "imageBox",
    "imageLink",
    "altText",
    "boxcolourclass",
    "rating",
    "ecoursetime",
    "isLast",
    "id",
    "type"
  ],
  components: {
    StarRating
  },
  methods: {
    setRating: function(rating){
      this.rating= rating;
    },
    navigate(id, type){
       
      
        if(this.$route.name == "social"){
           this.$router.push({ name: type.split("s")[0].toLowerCase(), params: { id: id } })
        }
             
    },
    /* roundup: function (ecoursetime) {		
      this.ecoursetime = this.ecoursetime.toFixed(2);
    } */
  }
  /* data: function(){
    return {
      rating: Number
    }
  } */
}
</script>

<style scoped>


.bluebox {
      background-color: #5E80F8;
    }
.greenbox {
    background-color:  rgb(18,244,122);
  }
  .yellowbox {
    background-color: yellow;
  }
.yellowbox > p {
  color: black;
}
#imageBox {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  width: 100px;
  height: 40px;
  float:left;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: 2px 3px 6px #00000073;
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
    background-color: rgba(235, 234, 234, 0.639);
    /* border: 1px solid #00000047; */
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
#ownerInfo {
  display: flex;
  margin: 0 -2%;
}

#ownerInfo>p {
  padding: 2%;
  font-weight: bold;
}

#liste {

    display: flex;
    justify-content: space-between;
    margin-top: 2%;

}

h1 {
  font-size: 1.7em;
}
h2 {
  font-size: 1.5em;
}

h2:first-letter{
  text-transform: capitalize;
}

p {
  font-size: 1em;
}


</style>