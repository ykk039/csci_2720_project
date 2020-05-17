 

import Vue from 'vue'
import Vuex from 'vuex'
import Location from '../assets/js/location'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    allComments:[],
    allUsers:[],
    allLocations:[],
    user:null,
    userFavourites:[],
    userFavouritesPID:[],
    status:[],
  },
  mutations: {
    loadComments(state, data) {
      state.allComments = data
    },
    loadFavourite(state, data) {
      state.userFavourites = data.favorites
      var userFavouritesPID = data.favorites.map(f=>{
        return f.pid
      })
      state.userFavouritesPID = userFavouritesPID
    },
    loadLocations(state, data) {
      state.allLocations = data
    },
    loadUsers(state, data) {
      state.allUsers = data
    },
    login(state,user){
      state.user = user
    },
    logout(state){
      state.user = null
      state.userFavourites = []
      state.userFavouritesPID = []
    },
    saveState(state,status){
      if(status.username){
        console.log('status',status.username)
        state.user = status.username
      }
      if(status.auth){
        state.user = 'admin'
      }
      state.status = status
    }

  },
  actions: {
    loadComments({ commit },pid) {
      var url ='http://localhost:3000/user/comments/'+pid
      axios.get(url)
      .then(function (response) {
        commit('loadComments', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    loadFavourite({ commit },username) {
      var url ='http://localhost:3000/user/favorites/'+ username
      axios.get(url)
      .then(function (response) {
        commit('loadFavourite', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    loadLocations({ commit }) {
      axios.get('http://localhost:3000/user/locations')
      .then(function (response) {
        commit('loadLocations', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    loadUsers({ commit }) {
      axios.get('http://localhost:3000/admin/users')
      .then(function (response) {
        commit('loadUsers', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    flushPrograms({dispatch }) {
      Program.flushPrograms()
      dispatch('loadLocations')
    },


    login({dispatch,commit},data){
      axios.create({withCredentials:true}).post('http://localhost:3000/login/', data)
      .then(function (response) {
        if(response.data == "Invalid username or password"){
          alert("Wrong username or password")
        }
        else{
          console.log("lofi response: ");
          console.log(response.data);
          console.log(data);
          commit('login',data.username)
          dispatch('loadFavourite',data.username)
          dispatch('saveState')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    saveState({commit}){
      axios.create({withCredentials:true}).get('http://localhost:3000/state/')
      .then(function (response) {
        console.log("hihi",response.data)
        commit('saveState',response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    logout({commit}){
      axios.create({withCredentials:true}).get('http://localhost:3000/logout/')
      .then(function (response) {
        commit('logout')
      })
      .catch(function (error) {
        console.log(error);
      });
    },
 
    
  },
  getters: {
    
      
  }
})
