<template>
<div id="card">
    <div id="left">
        <div id="imagebox">
            <p>{{userProfile.name}}</p>
        </div>
        <img :src=image-link :alt=altTex>
    </div>

    <div id="right">
        <h2>{{userProfile.Heading}}</h2>
        <h3>About Me:</h3>
        <p>{{userProfile.About}}</p>
        <div id="location"><img src="@/assets/home.svg" alt="Location"><p class="right">: {{userProfile.Location}}</p></div>
        <button type="button" id ="editButton" style="float: right"><a>Edit</a></button>
    </div>
</div>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MyInfoCard',
    data() {
        return {

        }
    },

    computed: mapState(['userProfile']),

    methods: {
        
    }

}
</script>

<style scoped>

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
    margin-bottom: 50px;
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-flow: row;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}

#card:hover{
    border: 1px solid #00000047;
    box-shadow: 2px 3px 6px #00000073;

}

#left {
    max-width: 30%;
    position: relative;
}

#right {
    padding: 0 2%;
    width: 70%;
}

#left img {
    height: 90%;
    width: 100%;
    display: block;
    object-fit: cover;
    float:left;
}

#location img{
    max-height: 1.5vw;
    max-width: 5%;
     float: left;
}

.right {
    float: left;
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