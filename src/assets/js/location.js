// import store from '../../store'
// import Config from './config'
// import Vue from 'vue'
import axios from 'axios'

class Location {
  constructor(options) {

  }
}

// Class Method
// Program.fetchOneProgram = function(pid) {
//   var url="http://localhost:3000/admin/program"+pid
//   axios.get(url)
//     .then(function (response) {
//       return response
//     })
//     .catch(function (error) {
//       alert(error);
//     });
// }

Location.flushLocations = function() {
  axios.post("http://localhost:3000/admin/fetch")
    .then(function (response) {
      alert("finshed")
      return ture
    })
    .catch(function (error) {
      alert(error);
    });
  
}




export default Location
