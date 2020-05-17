<template>
  <div class="ma-5">
    <v-toolbar flat color="white">
      <v-btn round  color="info" @click="back()"><v-icon small>arrow_back_ios</v-icon>Back</v-btn>
      <v-toolbar-title>User Management</v-toolbar-title>
      <v-divider class="mx-2" inset vertical ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="info" dark class="mb-2">New User</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.username" :rules="nameRules" :counter="20" label="Username" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.password" :rules="nameRules" :counter="20" label="Password"  required></v-text-field>
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
    <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1" >
      <template slot="items" slot-scope="props">

          <td class="text-xs-left">{{ props.item.username }}</td>
          <td class="text-xs-left">{{ props.item.password }}</td>

        <td class="layout px-4">
          <v-icon  small  class="mr-2" @click="editItem(props.item)" > edit </v-icon>
          <v-icon  small  @click="deleteItem(props.item)" >  delete  </v-icon>
        </td>


      </template>
      <!-- <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      dialog: false,
      search:'',
      headers: [
          { text: 'Username ',align: 'left',value: 'username'},
          { text: 'Password ',align: 'left',value: 'password'},
          { text: 'Actions', value: 'name', sortable: false }
        ],
      editedIndex: -1,
      editedItem: {
        username:'', password: '', 
      },
      defaultItem: {
        username: '', password: '',
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        v => (v && v.length >= 4 ) || 'Name must be longer than 4 characters'
      ],
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
      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.users.indexOf(item)
        var url = "http://localhost:3000/admin/user/"+item.username
        var item_info = "Username: "+item.username+"\n"+ "Password: "+item.password+"\n"
        if(confirm('Are you sure you want to delete the following item?\n'+item_info)){
          axios.delete(url)
            .then(function (response) {
              alert(response.data)
              this.$store.dispatch('loadUsers')
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
          axios.put('http://localhost:3000/admin/user/', this.editedItem)
            .then(function (response) {
              alert(response.data);
              this.$store.dispatch('loadUsers')
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios.post('http://localhost:3000/admin/user/', this.editedItem)
            .then(function (response) {
              alert(response.data);
              this.$store.dispatch('loadUsers')
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
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
      users(){
        return this.$store.state.allUsers
      }
    },
  }
</script>
<style scoped>

</style>