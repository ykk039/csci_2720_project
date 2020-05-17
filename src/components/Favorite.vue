<template>
  <v-card>
    <v-card-title>
      <v-btn round  color="info" @click="back()"><v-icon small>arrow_back_ios</v-icon>Back</v-btn>
      <span class="headline">Favourite</span>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="favourites" :search="search" >
      <template slot="items" slot-scope="props">
        <router-link tag="tr"  :to="{path:`/location/${props.item.pid}`,query:{location:props.item}}">
          <td class="text-xs-left">{{ props.item.pid }}</td>
          <td class="text-xs-left">{{ props.item.locationName }}</td>
          <td class="text-xs-left">{{ props.item.latitude }}</td>
          <td class="text-xs-left">{{ props.item.longitude }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
        </router-link>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'Location ID ',align: 'left',value: 'pid'},
          { text: 'Location Name ',align: 'left',value: 'locationName'},
          { text: 'Latitude ',align: 'left',value: 'latitude'},
          { text: 'Longitude', value: 'longitude' },
          { text: 'Address', value: 'address' },
          { text: 'Phone', value: 'phone' },
        ],
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
    },
    computed:{
      favourites(){
        console.log(this.$store.state.userFavourites)
        return this.$store.state.userFavourites
      },
    }
  }
</script>

<style scoped>
h1, h2 {
  margin-top: 100px;
}
.elevation-1 {
    margin: 10px;
}
.v-card{
  margin:15px;
}
</style>