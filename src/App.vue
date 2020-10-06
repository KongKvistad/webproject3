<template>
  <div id="app">

    <nav>
      <router-link to="/">Go to Home</router-link>
      <router-link to="/discover">Discover</router-link>
      <router-link to="/marketplace">Marketplace</router-link>    
      <router-link to="/stuff">Settings</router-link>
      <p v-if="userProfile.name" @click="logOut()">logout</p>
      <p v-else @click="logIn()">login</p>
    </nav>
    <!-- end header -->
   
    
    <router-view/>
    
  </div>
</template>

<script>

import store from './store'
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {

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
