
<template>
<div class="ma-4">
  <v-card >
    <v-card-title>
      <span class="headline">Location</span>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-select :items="fields" class="mx-5 mt-4" label="search by field" v-model="selected" ></v-select>
    </v-card-title>
    <v-data-table :headers="headers" :items="locations" :search="search" :custom-filter="customFilter" >
      <template slot="items" slot-scope="props">
        <router-link tag="tr"  :to="{path:`/location/${props.item.pid}`,query:{location:props.item}}">
          <td class="text-xs-left">{{ props.item.pid }}</td>
          <td class="text-xs-left">{{ props.item.locationName }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
        </router-link>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        search: '',
        selected:'',
        headers: [
          { text: 'Location ID ',align: 'left',value: 'pid'},
          { text: 'Location Name ',align: 'left',value: 'locationName'},
          { text: 'Address', value: 'address' },
          { text: 'Phone', value: 'phone' },
        ],
        fields: ['all','pid', 'locationName','address', 'phone'],
        progname:true,
      }
    },
    methods:{
      customFilter(items, search, filter) {
        var selected = this.selected
        search = search.toString().toLowerCase()
        if(selected=="all"){
           return items.filter(item => filter(item["pid"], search) || filter(item["locationName"], search) || filter(item["address"], search)|| filter(item["phone"], search));
        }
        else if(selected) {
           return items.filter(row => filter(row[selected], search));
        }
        return items.filter(item => filter(item["pid"], search) || filter(item["locationName"], search) || filter(item["address"], search)|| filter(item["phone"], search));

      }
    },
    computed:{
      locations(){
        return this.$store.state.allLocations
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