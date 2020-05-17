
<template>
<div id="ProgramDetail">
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md12 lg12>
        
        <v-card>
         <v-toolbar flat color="white">
          <v-btn round  color="info" @click="back()"><v-icon small>arrow_back_ios</v-icon>Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn round  fab flat style="margin-top: 13px;" @click="favourite()">
            <v-icon large v-if="isFavourite==true" >favorite</v-icon>
            <v-icon large v-if="isFavourite == false" >favorite_border</v-icon></v-btn>  
           <v-dialog v-model="dialog" max-width="500px">
            
            <v-btn slot="activator" color="info" class="mb-2">New Comment</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">New Comment</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                       <v-textarea name="comment" label="Type your comment here" v-model="comment" ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Post</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


         </v-toolbar>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex xs6 > 
                <v-card>
                  <v-card-title class="subheading font-weight-bold">Location</v-card-title>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content class="font-weight-bold">Location ID:</v-list-tile-content>
                      <v-list-tile-content class="align-end ">{{ item.pid }}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content class="font-weight-bold">Location Name:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ item.locationName }}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content class="font-weight-bold">Address:</v-list-tile-content>
                    </v-list-tile>

                    {{ item.address }}

                    <v-list-tile>
                      <v-list-tile-content class="font-weight-bold">Phone:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ item.phone }}</v-list-tile-content>
                    </v-list-tile>

                  </v-list>
                </v-card>
                <GmapMap
                  :center="myCoordinates"
                  :zoom="17"
                  style="width:100%; height:360px; margin: 8px auto;"
                >
                  <GmapMarker
                    :position="myCoordinates"
                  />
                </GmapMap>
              </v-flex>

              <v-flex xs6>
                <v-card  class="commentClass scroll" height="100">
                  <v-card-title class="subheading font-weight-bold">Comments</v-card-title>

                  <v-divider></v-divider>

                  <v-list >
                    <v-list-tile v-if="comments.length == 0" >
                      <v-list-tile-content class="font-weight-bold">No Comment for this Location.</v-list-tile-content>
                    </v-list-tile>

                  <v-list two-line>
                    <template v-for="(item, index) in comments">
                      <v-list-tile :key="index" avatar ripple >
                        <v-list-tile-content>
                          <v-list-tile-title class="font-weight-bold">{{ item.user.username }}</v-list-tile-title>
                          <v-list-tile-sub-title style="font-size: 16px;">{{ item.comment }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider  :key="`divider-${index}`"></v-divider>
                    </template>
                  </v-list>

                  </v-list>
                </v-card>

              </v-flex>

            </v-layout>

       
          </v-container>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import GoogleMapLoader from './GoogleMapLoader'

export default {
  components:{
  },
  props: ['pid'],
  data() {
    console.log("item.latitude");
    console.log(this.$route.query.location.latitude);
    return {
      dialog: false,
      comment:"",
      myCoordinates: {
          lat: this.$route.query.location.latitude,
          lng: this.$route.query.location.longitude
      },
    }
  },
  mounted:function(){
    this.$store.dispatch('loadComments',this.$route.params.pid)
  },

  methods: {
    back(){
      this.$router.go(-1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    favourite(){
      var data={username:this.$store.state.user,locationID:this.$route.params.pid}
      console.log(data)
      axios.put('http://localhost:3000/user/favorites/', data)  
        .then(function (response) {
          this.$store.dispatch("loadFavourite",this.$store.state.user)
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    },
    unfavourite(){
      console.log("unfavourite")
    },
    save () {
      var data = {username:this.$store.state.user,comment:this.comment, locationID:this.$route.params.pid}
      axios.post('http://localhost:3000/user/comments/', data)
        .then(function (response) {
          alert(response.data);
          this.$store.dispatch('loadComments',this.$route.params.pid)
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      this.close()
    }
  },
  computed: {
    comments(){
      return this.$store.state.allComments
    },
    item(){
      return this.$route.query.location
    },
    isFavourite(){
      return this.$store.state.userFavouritesPID.includes(this.$route.params.pid)
    },

  },

};
</script>
<style scoped>
.commentClass{
  min-height:465px;
}
div{
  font-size: 17px;
}
.v-dialog__activator, .v-dialog__activator * {
    cursor: pointer;
    margin-top: 18px;
}
.scroll {
      overflow-y: auto;
    }
</style>