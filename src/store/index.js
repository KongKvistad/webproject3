import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../components/firebaseInit'
import router from '../router/index'
import {getCollections} from '../helpers/collections'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
      userProfile: {},
      filters: {}
    },
    mutations: {
      setUserProfile(state, val) {
        state.userProfile = val
      },

      setFilters(state, val){
        state.filters = val
      }

      
    },
    actions: {
      async login({ dispatch }, form) {
        // sign user in
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        // fetch user profile and set in state
        user.cameFrom = form.cameFrom
        dispatch('fetchUserProfile', user)
      },



      async signup({ dispatch }, form) {
        // sign user up
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
  
        // create user object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: form.name,
          title: form.title
        })
  
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      },



      async fetchUserProfile({ commit }, user) {
        // fetch user profile
        const userProfile = await fb.usersCollection.doc(user.uid).get()
  
        // set user profile in state
        commit('setUserProfile', userProfile.data())
  
        // change route to whereever the user originally came from
        if (router.currentRoute.path === '/login') {
         
          router.push(user.cameFrom ? user.cameFrom : "/")
        }
      },





      async logout({ commit }) {
        // log user out
        await fb.auth.signOut()
  
        // clear user data from state
        commit('setUserProfile', {})
  
        // redirect to login view
        router.push('/login')
      },

      async fetchFilters({ commit }) {
        // filters
        const filterData = await getCollections("filters", false);
  
        // set user filters in state
        commit('setUserProfile', filterData.data())
  
        
      },
    }
  })
  
  export default store
  