 

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
    v: '3.26',
  },
  installComponents: true
})

new Vue({
  // el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')
