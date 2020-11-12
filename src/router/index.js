// import Vue from 'vue'
// import Router from 'vue-router'
// import HomePage from './../components/home/Home.vue'
// import Stuff from './../components/stuff/Stuff.vue'
// import Login from './../components/stuff/Login.vue'

// Vue.use(Router)

// export default new Router({
//     routes: [
//       { path: '/', component: HomePage },
//       { path: '/stuff', component: Stuff },
//       { path: '/login', component: Login },
//     ]
// })

import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../components/firebaseInit'
import HomePage from './../views/Home.vue'
import Stuff from './../components/stuff/Stuff.vue'
import Login from './../components/stuff/Login.vue'
import Discover from './../views/Discover.vue'
import Marketplace from './../views/Marketplace.vue'
import Ecourse from './../views/Ecourse.vue'
import profileAbout from './../views/Profile/profileAbout.vue'
import profileSettingsGeneral from './../views/Profile/Settings/profileSettingsGeneral.vue'
import Social from './../views/Social.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    
  },
  {
    path: '/stuff',
    name: 'Stuff',
    component: Stuff,
    meta: {
        requiresAuth: true
      }
    
  },
  {

    path: "/discover",
    name: "discover",
    component: Discover,
  },
  {
    path: "/marketplace",
    name: "marketplace",
    component: Marketplace,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ecourse/:id',
    name: 'Ecourse',
    component: Ecourse
  },
  {
    path: '/profile/aboutme',
    name: 'profileAbout',
    component: profileAbout
  },
  {
    path: '/profile/settings/general',
    name: 'profileSettingsGeneral',
    component: profileSettingsGeneral
  },
  {
    path: '/social',
    name: 'social',
    component: Social
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// navigation guard to check for logged in users. Also gives the appropriate enpoint at which the user came from
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    router.push({ path: 'login', query: { cameFrom: to.fullPath } })
  } else {
    next()
  }
})

export default router
