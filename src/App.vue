<template>
  <div id="app">
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin:0;
}
#app {
    font-family: Arial, Helvetica, sans-serif;
}

</style>
