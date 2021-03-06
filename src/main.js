// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as firebase from 'firebase'
import store from './store'
import EditDialog from './components/Meetup/EditMeetupDialog'

Vue.use(Vuetify, { theme: {
  primary: '#053768',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.component('app-edit-dialog',EditDialog)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBX8WSA2NWZdKQi1ID0kg0ofPjsOOs7KTc',
      authDomain: 'meetups-680cc.firebaseapp.com',
      databaseURL: 'https://meetups-680cc.firebaseio.com',
      projectId: 'meetups-680cc',
      storageBucket: 'meetups-680cc.appspot.com',
      messagingSenderId: '475927405779'
    })
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    this.$store.dispatch('fetchMeetups')
  }
})
