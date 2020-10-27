// import Vue from 'vue'
// import App from './App.vue'
// // we import the vue router from our router/index.js file
// import router from './router'
// import './components/firebaseInit'

// Vue.config.productionTip = false

// new Vue({
//   router, // we tell our vue instance to use this vue router
//   render: h => h(App),
// }).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './components/firebaseInit'

Vue.config.productionTip = false
Vue.prototype.$objFilter = function(param) {
  let res = []
  for(var key in param){
    if (Object.prototype.hasOwnProperty.call(param, key)){
      let obj = param[key]
      obj.uid= key
      res.push(obj)
    }
  }
  return res
};

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})
