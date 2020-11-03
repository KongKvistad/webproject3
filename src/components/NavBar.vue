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
          <div id="navDiscover" :class="[currentPage.includes('Discover') ? activeDiscover : '']"><router-link to="/Discover"><img src="@/assets/compass.svg">Discover</router-link></div>
          <div id="navMarket" :class="[currentPage.includes('market') ? activeMarket : '']"><router-link to="/market"><img src="@/assets/marketplace.svg">Marketplace</router-link></div>
          <div id="navSocial" :class="[currentPage.includes('social') ? activeSocial : '']"><router-link to="/social"><img src="@/assets/users.svg">Social</router-link></div>
      </div>
      <div id="left">
        <div v-if="userProfile" class="dropdown"><img src="@/assets/user.svg">{{userProfile}}
          <div class="dropdown-content">
            <router-link to="/profile/aboutme">Profile</router-link>
            <a @click="logOut()">Log Out</a>
          </div>
        </div>
        <div v-else><router-link to="/login">LOG IN</router-link></div> 
      </div>
  </div>
</template>

<script> //Javascript and vue scripts to be used in the component
import store from '@/store';
export default {
    name: 'NavBar', // name of component to be used elsewhere as well as router
    data() {
        return {
          activeDiscover: 'activeDiscover',
          activeMarket: 'activeMarket',
          activeSocial: 'activeSocial',
        }

    },

    props: ["userProfile"],

    methods: {
    logOut: function(){
      store.dispatch('logout')
    },

    
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
    background-color: white;
    padding: 0 5vw;
    border-bottom: 1px solid black;
    margin-top: 5px;
    max-height: 5vw;
    
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

.activeDiscover{
  border-bottom: 0.5vw solid rgb(94,166,248);
}

#navDiscover:hover {
  border-bottom: 0.5vw solid rgb(94,166,248);
}

.activeMarket {
  border-bottom: 0.5vw solid rgb(18,244,122);

}

#navMarket:hover{
  border-bottom: 0.5vw solid rgb(18,244,122);

}
.activeSocial{
  border-bottom: 0.5vw solid rgb(255,230,3);
} 

#navSocial:hover{
  border-bottom: 0.5vw solid rgb(255,230,3);
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

</style>