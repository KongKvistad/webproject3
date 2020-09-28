<!--
*
* @desc Navigation bar at the top of every site
*
-->

<template>
    <div id="nav">  
        <div id="logo">
            <div>LOGO</div>
        </div>
        <div id="links">
            <div class="active" id="navDiscover"><a href=""><img src="@/assets/compass.svg">Discover</a></div>
            <div id="navMarket"><a href=""><img src="@/assets/marketplace.svg">Marketplace</a></div>
            <div id="navSocial"><a href=""><img src="@/assets/users.svg">Social</a></div>
        </div>
        <div id="profile">
            <a href=""><img src="@/assets/user.svg">Profile</a>
        </div>
    </div>
</template>

<script> //Javascript and vue scripts to be used in the component
export default {
    name: 'NavBar', // name of component to be used elsewhere as well as router
    data() {

    },

    methods: {

    },
}
</script>



<style scoped> /* CSS styling for the navigation bar */
#nav{
    display: grid;
    min-height: 5vw;
    grid-auto-flow: column;
    background-color: white;
    grid-gap: 1.5em;
    padding: 0 40px;
    border-bottom: 1px solid black;
    margin-top: 5px;
    
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
  grid-gap: 1.5em;
  
}

#navDiscover img{
    bottom: 1em;
    left: 3.2em;
    position: relative;
}

#nav a {
  text-decoration: none;
  color: #333;
}

#nav a:hover {
  text-decoration-line: underline;
}

#nav img{
    height: 3vw;
    /* bottom: 1em;
    left: 2.7em;
    position: relative; */
}

#profile{
    display: grid;
    justify-content: right;
    align-content: center;
    grid-auto-flow: column;
    grid-gap: 1em;
}

.active {
    border-bottom: 1px solid #5e80f8;
}

</style>