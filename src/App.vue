<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Card title="Sound boss" owner="NTNU" deadline="24.09.2020"
    description="this is a year abroad" price="500" reviews="4"
    duration="10"/>

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
