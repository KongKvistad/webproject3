<template>
  <div id="app">
    <!-- insert header -->
    <nav>
      <router-link to="/">Go to Home</router-link>    
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  nav{
    display: flex;
    justify-content: center;
    
    
  }
  nav >*{
    margin:0px;
    flex-basis: 33%;
  }
</style>
