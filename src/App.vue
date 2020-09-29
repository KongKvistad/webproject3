<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Card title="Sound boss" owner="NTNU" deadline="24.09.2020"
    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to.." price=500 reviews=4
    duration="10" imageLink="https://image.freepik.com/free-photo/man-recording-studio-music-production_1303-20390.jpg" altText="Image of a recording studio"/>

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Card from './components/cards.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    Card
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
