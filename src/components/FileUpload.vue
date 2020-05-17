
<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">

      <form @submit.prevent="sendFile()" enctype="multipart/form-data" >
        <div class="field">
          <label for ="file" class="label">Upload Files</label>
          <input name="csvfile" type="file" ref="file" @change="handleFileUpload()"/>
        </div>
        <div class="field">
          <button class="button is-info">Send</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data(){
      return {
        file: ''
      }
    },

    methods: {

    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
     sendFile(){
      const formData = new FormData();
      formData.append('file', this.file);

      try{
         axios.post( 'http://localhost:3000/admin/location_csv/', formData );
      }catch(err){
         console.log(err)
      }finally{
        alert("uploaded")
        setTimeout(function(){ this.$store.dispatch('loadLocations') }.bind(this), 2000);
      }
      
    },
  }
}
</script>

<style scoped>
input{
  border-style:ridge
}
</style>