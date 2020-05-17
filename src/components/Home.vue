<template>
  <div id="Home">

  <Login v-if="user==null"></Login>
  <!-- <Info v-if="user!=null"></Info> -->
  <About v-if="user!=null"></About>
  </div>
</template>

<script>
import Login from "./Login";
import Info from "./Info";
import About from "./About"

export default {
  name: "Home",
  components:{
    Login,
    Info,
    About
  },
  watch: {
    // user: function () {
    //  if(user){
    //    this.$router.push('/info')
    //  }
    // },
  },
  data() {
    return {
    
    }
  },


  methods: {
 
  },
  computed: {
    user(){
      return this.$store.state.user 
    }
  },

};
</script>

<style scoped>
h1, h2 {
  margin-top: 100px;
}
</style>