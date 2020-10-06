<template>
  <div id="app">

    <NavBar :userProfile="userProfile.name"></NavBar>
    
    <router-view/>
    
  </div>
  
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import store from './store'
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data(){
    return {
    
    }
  },
  methods: {
    logOut: function(){
      store.dispatch('logout')
    }
  },
  computed: mapState(['userProfile']),
    
  
  // mounted:function(){
  //   console.log(this.isLoggedIn)
  // }

}
</script>

<style>
html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

  nav{
    display: flex;
    justify-content: center;
    
    
  }
  nav >*{
    margin:0px;
    flex-basis: 33%;
  }
body {
  margin:0;
}
#app {
    font-family: Arial, Helvetica, sans-serif;
}

</style>
