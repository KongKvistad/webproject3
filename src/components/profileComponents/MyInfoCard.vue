<!--
*
@desc   Information about yourself in a card layout similar to other cards used
*
-->

<template>
<div id="card">
    <div id="left">
        <div id="imagebox">
            <h2>{{userProfile.name}}</h2>
        </div>
        <img :src="userProfile.ImgURL" alt="Profile Picture">
    </div>

    <div id="right">
        <h2>{{userProfile.Heading}}</h2>
        <h3>About Me:</h3>
        <p>{{userProfile.About}}</p><br>
        <div id="location"><img src="@/assets/home.svg" alt="Location"><p class="right">: {{userProfile.Location}}</p></div>
        <button type="button" id ="editButton" style="float: right"><router-link to="/profile/settings/general">Edit</router-link></button><br><br>
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
    width: 90%;
    display: flex;
    flex-direction: column;
    flex-flow: row;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-right: 1.5vw;
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
    max-height: 70%;
    width: auto;
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

#editButton {
    border: 1px solid;
    padding: 0 0.3% 0 0.3%;
    background-color: #bb4584;
    color: white;
    border-radius: 10%;
    float: right;
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