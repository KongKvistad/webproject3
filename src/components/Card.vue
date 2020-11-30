<template>

  <div @click="navigate(id)" id="card" :style="isLast ? 'margin-top: 30px;' : void(0)">
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
            <p v-if="timePosted">Posted: {{ timePosted.toDate().toDateString() }}</p>
            <p v-if="country">&middot;</p>
            <p v-if="country">{{country}} </p>
            <p v-if="city">&middot;</p>
            <p v-if="city">{{city}} </p>
            <p v-if="language">&middot;</p>
            <p v-if="language">Language: {{language}}</p>
          </div>
          <p v-if="deadline" id = "deadline">Terms of stay: {{ deadline }}</p>
          <p id="desc">{{ description }}</p>

          <div id="liste">
                <p v-if="price>0" :style= "[imageBox == 'Item' ? {'color': 'green', 'font-size': '1em'} : {}]">{{ price }}$</p>
                <p v-else-if="price==0" :style= "price==0 ? {'color': 'green', 'font-size': '1.3em'} : {}">FREE</p>
                <p v-if="reviews">{{ reviews }} testemonies</p>
                <p v-if="duration">{{ duration }} </p>
                <p v-if="type">Type: {{ type }}</p>
                <p v-if="ecoursetime>60" > {{ ecoursetime/60 }} hours </p>
                <p v-else-if="ecoursetime<60"> {{ecoursetime}} minutes</p>
                <div v-if="rating">
                  <star-rating v-model="rating" read-only=true @rating-selected ="setRating" star-size= 20></star-rating>
                </div>
                <div v-if="currentPage.includes('Marketplace')">
                  <button id="buybutton" type="button" @click="modalShowing = true">Buy Now</button>
                  <Modal v-if="modalShowing" @close="modalShowing = false">
                    <h2 slot="header">Buy item</h2>
                    <PaymentForm slot="modal-body"/>
                  </Modal>
                </div>
          </div>
      </div>
      
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
//import Button from '@/components/Button.vue';
import PaymentForm from '@/components/PaymentForm.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Card',
  props: [
    "title",
    "timePosted",
    "country",
    "owner",
    "deadline",
    "description",
    "price",
    "reviews",
    "duration",
    "language",
    "imageBox",
    "imageLink",
    "altText",
    "boxcolourclass",
    "rating",
    "ecoursetime",
    "isLast",
    "id",
  ],
  components: {
    StarRating,
    PaymentForm,
    Modal
  },
  data(){
    return{
    modalShowing: false,
    }
  },
  methods: {
    setRating: function(rating){
      this.rating= rating;
    },
    navigate(id){
        if(this.$route.name == "social"){
          this.$router.push({ name: 'group', params: { id: id } })
        }
             
    },
    /* roundup: function (ecoursetime) {		
      this.ecoursetime = this.ecoursetime.toFixed(2);
    } */
  },

  computed: {
    currentPage(){
      return this.$route.path;
    }
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
      background-color: #85add9;
    }
.greenbox {
    background-color:  #78d3a6;
  }
  .yellowbox {
    background-color: #f4e58c;
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
    background-color: rgb(237,242,247,0.4);
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
#desc {
  color: #717171;
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

#buybutton{
  padding: 0% 0.2em 0% 0.2em;
  margin-bottom: 0.2em;
  background-color: #78d3a6;
  border: solid black 1px 30%;
  border-radius: 3px;
}


</style>