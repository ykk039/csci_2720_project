 

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(Vuetify)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAIYfGXqgL1JNTsK--grAfsuJlbKwQziJo',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
  installComponents: true
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
