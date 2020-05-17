<template>
<div class="left">

  <v-card class="ma-5">
    <div class="pl-5 pt-5">
   <div class="headline">About This Project</div><br>
   <h2 >Work Division</h2><br>
<br>
<h2>Technologies and frameworks/libraries in use</h2>
<p>This Web App is a Single Page Application which is developed with Vuejs as the front-end framework and Nodejs, Express as the back-end framework. The database we use is MongoDB. </p>
</div>
      <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex xs6 > 
                <v-card>
                  <v-card-title class="subheading font-weight-bold">Advatanges</v-card-title>
                  <v-card-text>1.Small size comparing to Angular</v-card-text>
                  <v-card-text>2.Flexibility, similar to React, Angular and JS framework</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs6 > 
                <v-card>
                  <v-card-title class="subheading font-weight-bold">Disadvantages</v-card-title>
                  <v-card-text>1.Not as popular as Angular, hence, fewer recourses</v-card-text>
                  <v-card-text>2.Too Flexible</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
      </v-container>
  </v-card>
  <p>We have read carefully the article in http://www.cuhk.edu.hk/policy/academichonesty/ </p>
  
</div>
</template>
<script>


export default {
  name: "About",

  data() {
    return {

    }
  },

  methods: {

  },

};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.left{
  text-align: left!important;
  
}
</style>