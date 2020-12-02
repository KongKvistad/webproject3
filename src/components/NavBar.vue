<!--
*
* @desc Navigation bar at the top of every site
*
-->

<template>
  <div id="nav">  
      <div id="logo">
          <router-link to="/"><div>LOGO</div></router-link>
      </div>
      <div id="links">

          <div @click="checkroute('Discover')" id="navDiscover" :class="[currentPage.includes('Discover') ? activeDiscover : '']"><router-link to="/Discover"><img src="@/assets/compass.svg">Discover</router-link></div>
          <div @click="checkroute('Marketplace')" id="navMarket" :class="[currentPage.includes('Market') ? activeMarket : '']"><router-link to="/market"><img src="@/assets/marketplace.svg">Marketplace</router-link></div>
          <div @click="checkroute('Social')" id="navSocial" :class="[currentPage.includes('Social') ? activeSocial : '']"><router-link to="/social"><img src="@/assets/users.svg">Social</router-link></div>
          <!--<div id="navSocial" :class="[currentPage.includes('social') ? activeSocial : '']" @mouseover="setActiveDropDown('social')" @mouseleave="setActiveDropDown(false)">
            <div><img src="@/assets/users.svg">Social</div>
          </div>-->

      </div>
      <div id="left">
        <div v-if="userProfile" class="dropdown"><img src="@/assets/user.svg">{{userProfile}}
          <div class="dropdown-content">
            <router-link to="/profile/aboutme">Profile</router-link>
            <router-link to="/profile/settings/general">Settings</router-link>
            <a class="loginout" @click="logOut()">Log Out</a>
          </div>
        </div>
        <div class="loginout" v-else><router-link to="/login"><img src="@/assets/user.svg">Log in</router-link></div> 
      </div>
       <transition name="dropTrans">
          <MenuDropDown v-on:cursorChanged="val => monitorCursor(val)" v-if="this.activeDropDown" :data="activeDropDown"/>
        </transition>
  </div>
  
</template>

<script> //Javascript and vue scripts to be used in the component
import store from '@/store';
import MenuDropDown from './MenuDropDown.vue'
export default {
    name: 'NavBar', // name of component to be used elsewhere as well as router
    components: {
      MenuDropDown
    },
    data() {
        return {
          activeDiscover: 'activeDiscover',
          activeMarket: 'activeMarket',
          activeSocial: 'activeSocial',
          activeDropDown: false,
          // posCats:{
          //   social: ["events", "groups"],
          //   marketplace: ["e-courses", "mentoring", "second-hand", "accomodation"],
          // },
          //cursorState: false
        }

    },

    props: ["userProfile"],

    methods: {
    logOut: function(){
      store.dispatch('logout')
    },
    checkroute:function(name){
      
      this.$router.push({ path: name}).then(this.$router.go(this.$router.currentRoute))
      
    }
      
    

    
    },

    computed: { 
      currentPage() { 
        return this.$route.path;
      }
    }
}
</script>



<style scoped> /* CSS styling for the navigation bar */
#nav{
    display: grid;
    min-height: 5vw;
    grid-auto-flow: column;
    background-color:white;
    padding: 0 5vw;
    max-height: 5vw;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
    
}

#logo {
  display: grid;
  justify-content: start;
  align-content: center;
  font-family: "Open Sans", sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: black;
  text-transform: uppercase;
}

#links {
  display: grid;
  justify-content: center;
  align-content: center;
  grid-auto-flow: column;
  grid-gap: 5vw;
}

#nav a {
  text-decoration: none;
  color: #333;
}

#left{
  display: grid;
  justify-content: right;
  align-content: center;
  grid-auto-flow: column;
  grid-gap: 0.5em;
}

.loginout:hover, .activeDiscover, #navDiscover:hover,.activeMarket, #navMarket:hover,.activeSocial, #navSocial:hover {
  border-bottom: 0.2vw solid rgb(78, 106, 133);
}
#navMarket, #navDiscover, #navSocial,.loginout {
  border-bottom: 0.2vw solid white;
}

#nav img{
    max-height: 2vw;
}

/* Style The Dropdown Button */

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  font-size: 0.9em;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 5%;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #f1f1f1;
}
.dropTrans-enter-active, .dropTrans-leave-active {
  transition: all 0.2s;
  max-height: 30%;
}
.dropTrans-enter, .dropTrans-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0px;
}
</style>