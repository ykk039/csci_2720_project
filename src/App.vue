<template>
  <div id="app">
    <v-app >
      <v-toolbar :clipped-left="$vuetify.breakpoint.mdAndUp" app fixed class="nav_background_color">

        <router-link to="/"></router-link>
        <v-spacer></v-spacer>
        <!-- <v-text-field light="" outline append-icon="search" clearable hide-details single-line v-model="searchInput" placeholder="Search by category or product name" class="searchbox"></v-text-field> -->
        <v-spacer></v-spacer>
        <v-progress-circular indeterminate v-if="load"  color="primary" ></v-progress-circular>
        <v-btn round v-if="user=='admin'" @click="flush()" ><v-icon class="mr-2" large>cloud_download</v-icon> Flush</v-btn>
        <v-btn round v-if="user=='admin'" :to="`/fileUpload`" ><v-icon class="mr-2" large>cloud_upload</v-icon> Upload</v-btn>
        <v-btn round v-if="user" :to="`/info`" ><v-icon large>list</v-icon>Info</v-btn>
        <v-btn round v-if="user && user!='admin'" :to="`/favorite`" ><v-icon large>favorite_border</v-icon>Favourite({{favoriteLength}})</v-btn>
        <v-btn round v-if="user=='admin'" :to="`/userEdit`" ><v-icon large>edit</v-icon>User_Edit</v-btn>
        <v-btn round v-if="user=='admin'" :to="`/programEdit`"  ><v-icon large>edit</v-icon>Location_Edit</v-btn>
        <v-btn round v-if="user" :to="`/about`" ><v-icon  large>info</v-icon> About</v-btn>

        
        <v-btn round :to="`/`" v-if="user!=null" @click="logout()"><v-icon large>account_circle</v-icon>{{user}} Logout</v-btn>
        
       

      </v-toolbar>
     


      <main>
        <router-view :key="$route.fullPath"></router-view>
      </main>
    </v-app>
    
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'app',
  data () {
    return {
      load:false,
      searchInput:null,
    }
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('saveState').then(()=>{
        console.log("hhih",this.$store.state.user)
        if(this.$store.state.user ==null){
          this.$router.push({ path: `/` })
        }
      })
    }
  },
  created() {
    this.$store.dispatch('saveState').then(()=>{
      console.log(this.$store.state.user)
    if(this.$store.state.user ==null){
      this.$router.push({ path: `/` })
    }
    this.$store.dispatch('loadLocations')
    this.$store.dispatch('loadUsers')
    })
  },
  methods:{
    flush(){
      this.load = true
      axios.post("http://localhost:3000/admin/fetch")
        .then(function (response) {
          alert("finished")
          this.load=false
          this.$store.dispatch('loadLocations')
        }.bind(this))
        .catch(function (error) {
          alert(error);
        });
    },
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed:{
    user(){
      return this.$store.state.user 
    },
    favoriteLength(){
      return  this.$store.state.userFavouritesPID.length
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 75px;
}
.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
  box-shadow: none;
}
h1, h2 {
  font-weight: normal;
}

</style>
