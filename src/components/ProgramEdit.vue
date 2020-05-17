
<template>
  <div class="ma-5">
    <v-toolbar flat color="white">
      <v-btn round  color="info" @click="back()"><v-icon small>arrow_back_ios</v-icon>Back</v-btn>
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <!-- <v-divider class="mx-2" inset vertical ></v-divider> -->
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-select label="fields.label" :options="fields.value" class="mx-5 mt-4"  v-model="selected"></v-select>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="info" dark class="mb-2">New Location</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.pid" label="Location ID"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.locationName" label="Location Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.latitude" label="Latitude"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.longitude" label="Longitude"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="locations" :search="search" :custom-filter="customFilter" class="elevation-1" >
      <template slot="items" slot-scope="props">

          <td class="text-xs-left">{{ props.item.pid }}</td>
          <td class="text-xs-left">{{ props.item.locationName }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="justify-center layout px-0">
          <v-icon  small  class="mr-2" @click="editItem(props.item)" > edit </v-icon>
          <v-icon  small  @click="deleteItem(props.item)" >  delete  </v-icon>
        </td>


      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
     <v-alert v-if="alert" type="success"  > Success! </v-alert> 
  </div>
</template>

<script>
import axios from 'axios'
  export default {

    data: () => ({
      alert: false,
      dialog: false,
      search:'',
      selected:'',
      fields: [{label:'All',value:'all'},{label:'Program Code',value:'pid'},
      {label:'Class Code',value:'classcode'},{label:'Program Name',value:'progname'},
      {label:'Start Date',value:'startdate'},{label:'Activity Type',value:'acttype'},
      {label:'Venue',value:'venue'},{label:'Quota',value:'quota'}],
          
      headers: [
          { text: 'Location ID ',align: 'left',value: 'pid'},
          { text: 'Location Name ',align: 'left',value: 'locationName'},
          { text: 'Address', value: 'address', sortable: false  },
          { text: 'Phone', value: 'phone', sortable: false  },
        ],
      editedIndex: -1,
      editedItem: {
        pid:0, classcode: 0, progname: '',
        startdate: 'yyyy-mm-dd', enddate: 'yyyy-mm-dd',
        starttime: '00:00', endtime: '00:00',
        acttype: '',  venue: '',  quota:0,
      },
      defaultItem: {
        pid:0,classcode: 0, progname: '',
        startdate: 'yyyy-mm-dd', enddate: 'yyyy-mm-dd',
        starttime: '00:00', endtime: '00:00',
        acttype: '',  venue: '',  quota:0,
      }
    }),
    

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      if(this.$store.state.user !='admin'){
        this.$store.dispatch('logout')
        this.$router.push({ path: `/` })
      }
    },

    methods: {
      back(){
        this.$router.go(-1)
      },
      customFilter(items, search, filter) {
        var selected = this.selected
        search = search.toString().toLowerCase()
        if(selected=="all"){
           return items.filter(item => filter(item["pid"], search) || filter(item["progname"], search) || filter(item["venue"], search) || filter(item["classcode"], search) ||  
        filter(item["startdate"], search)|| filter(item["quota"], search) || filter(item["acttype"], search));
        }
        else if(selected) {
           return items.filter(row => filter(row[selected], search));
        }
        return items.filter(item => filter(item["pid"], search) || filter(item["progname"], search) || filter(item["venue"], search) || filter(item["classcode"], search) ||  
        filter(item["startdate"], search)|| filter(item["quota"], search) || filter(item["acttype"], search));

      },
      editItem (item) {
        console.log(item)
        this.editedIndex = this.locations.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.locationID = this.editedItem.pid
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.locations.indexOf(item)
        var url = "http://localhost:3000/admin/location/"+item.pid
        var item_info = "Program Code: "+item.pid+"\n"+ "Location Name: "+item.locationName+"\n"+  "Latitude: "+item.latitude+"\n"+  "Longitude: "+item.longitude+" \n"+
        "Address: "+item.address+"\n"+ "Phone: "+item.phone+"\n"
        if(confirm('Are you sure you want to delete the following item?\n'+item_info)){
          axios.delete(url)
            .then(function (response) {
              alert(response.data)
              this.$store.dispatch('loadLocations')
            }.bind(this))
            .catch(function (error) {
              alert(error);
            });
       } 
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          axios.put('http://localhost:3000/admin/location/', this.editedItem)
            .then(function (response) {
              alert(response.data)
              this.$store.dispatch('loadLocations')
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios.post('http://localhost:3000/admin/location/', this.editedItem)
            .then(function (response) {
              alert(response.data)
              this.$store.dispatch('loadLocations')

            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        }
        this.close()
      }
    },
    
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Location' : 'Edit Location'
      },
      locations(){
        console.log("hererererr123123123");
        console.log( this.$store.state.allLocations);
        return this.$store.state.allLocations
      }
    },
  }
</script>
<style scoped>

</style>