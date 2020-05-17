<template>
  <v-card class="ma-5">
    <div><h1 class="py-5">Welcome!</h1></div>
    <v-form ref="form" v-model="valid" lazy-validation class="mx-5">
      <v-text-field v-model="username" :rules="nameRules" label="Name" required ></v-text-field>
      <v-text-field  v-model="password" :rules="nameRules" label="Password" required  ></v-text-field>
     <v-btn class="my-5" color="blue lighten-4" :disabled="!valid"  @click="login()" > Login</v-btn>
     <v-btn class="my-5" color="teal lighten-4"  @click="admin()" > Admin</v-btn>
    </v-form>
  </v-card>

</template>
<script>

import axios from 'axios'
export default {
  name: "Login",

  data() {
    return {
      username:'',
      password: '',
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        v => (v && v.length >= 4) || 'Name must be longer than 4 characters'
      ],
    }
  },

  methods: {
    admin(){
      this.username = "user12"
      this.password = "user123"
      this.login()
    },
    login(){
      this.$store.dispatch('login',{username:this.username, password:this.password})
    },
  },

};
</script>

<style scoped>
input{
  border-style:ridge
}
.v-card{
    margin-left: 30%!important;
    margin-right: 30% !important;
    min-width: 500px!important;

}
</style>