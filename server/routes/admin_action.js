var schemas = require('../db.js');
const express = require('express');
const router =express.Router();
// const axios = require('axios');
const request = require("request");
var bodyParser = require('body-parser');
var multer = require('multer');
var bcrypt = require('bcryptjs');
var fs = require('fs');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
const PostAPI = 'https://api.yelp.com/v3/businesses/search?latitude=22.420213&longitude=114.2051273'

var upload = multer({ dest: 'uploads/' });
var Location = schemas.Location;
var User= schemas.User;
//GET POST

router.post('/location',(req,res)=>{
  var location = new Location({
    pid: req.body['pid'],
    locationName: req.body['locationName'],
    latitude: req.body['latitude'],
    longitude: req.body['longitude'],
    address: req.body['address'],
    phone: req.body['phone'],
  });

  location.save(function(err) {
    if (err)
      return res.send(err);
    res.status(201);
    res.send("Location added! <br>\n" +
      "Location ID: "+location.pid+"<br>\n"+
      "Location Name: "+location.locationName+"<br>\n"+
      "Latitude: "+location.latitude+" <br>\n"+
      "Longitude: "+location.longitude+"<br>\n"+
      "Address: "+location.address+"<br>\n"+
      "Phone: "+location.phone+"<br>\n"
    );
  });
});
router.get('/location/:pid',(req,res)=>{
  Location
    .findOne({pid: req.params['pid']})
    .exec(
      function(err, p) {
        if (err)
          return res.send(err);
        if(p==null)
          return res.send("Cannot find the Location!")
        res.send(
          "Location ID: "+location.pid+"<br>\n"+
          "Location Name: "+location.locationName+"<br>\n"+
          "Latitude: "+location.latitude+" <br>\n"+
          "Longitude: "+location.longitude+"<br>\n"+
          "Address: "+location.address+"<br>\n"+
          "Phone: "+location.phone+"<br>\n"
        );
      });
});
router.put('/location',async (req,res)=>{
  if(req.body['locationID']==null)
    return res.send("Please input Location ID");
  if(req.body['locationName']!=null){
    var conditions = { pid: req.body['locationID']},
      update = { $set: { classcode: req.body['locationName'] }};
    await Location.updateOne(conditions,update,function(err,location){
    })
  }
  if(req.body['latitude']!=null){
    var conditions = { pid: req.body['locationID']},
      update = { $set: { startdate: req.body['latitude'] }};
    await Location.updateOne(conditions,update,function(err,location){
    })
  }
  if(req.body['longitude']!=null){
    var conditions = { pid: req.body['locationID']},
      update = { $set: { enddate: req.body['longitude'] }};
    await Location.updateOne(conditions,update,function(err,location){
    })
  }
  if(req.body['address']!=null){
    var conditions = { pid: req.body['locationID']},
      update = { $set: { starttime: req.body['address'] }};
    await Location.updateOne(conditions,update,function(err,location){
    })
  }
  if(req.body['phone']!=null){
    var conditions = { pid: req.body['locationID']},
      update = { $set: { endtime: req.body['phone'] }};
    await Location.updateOne(conditions,update,function(err,location){
    })
  }
  return res.send("updated!");
});

router.delete('/location/:pid',(req,res)=>{
  Location.findOneAndDelete({pid:req.params['pid']},function(err,p){
    if(err)
      return res.send(err);
    if(p==null)
      return res.send("No such location");
    res.send("Location Deleted!<br>\n"+
      "Location ID: "+location.pid+"<br>\n"+
      "Location Name: "+location.locationName+"<br>\n"+
      "Latitude: "+location.latitude+" <br>\n"+
      "Longitude: "+location.longitude+"<br>\n"+
      "Address: "+location.address+"<br>\n"+
      "Phone: "+location.phone+"<br>\n"
    );
  })
});

router.post('/user',(req,res)=>{
  var hash=bcrypt.hashSync(req.body['password']);
  var user = new User({
    username: req.body['username'],
    password: hash
  });

  user.save(function(err) {
    if (err)
      return res.send(err);
    res.status(201);
    res.send("User Created! <br>\n" +
      "Username: "+user.username+"<br>\n"+
      "Password: "+user.password+"<br>\n"+
      "Admin: " + user.admin+"<br>\n"
    );
  });
});
router.get('/user',(req,res)=>{
  User
    .findOne({username: req.body['username']})
    .exec(
      function(err, u) {
        if (err)
          return res.send(err);
        if(u==null)
          return res.send("Cannot find the User!")
        res.send("Username: "+u.username+"<br>\n"+
          "Password: "+u.password+"<br>\n"+
          "Admin: "+u.admin+"<br>\n"+
          "Favorites: "+u.favorites.toString()+"<br>\n"
        );
      });
});
router.get('/users',(req,res)=>{
  User
    .find({admin:false})
    .exec(
      function(err, u) {
        if (err)
          return res.send(err);
        if(u==null)
          return res.send("Cannot find the User!")
        res.send(u);
      });
});
router.put('/user',(req,res)=>{
  if(req.body['username']==null)
    return res.send("Please input username");
  if(req.body['password']!=null){
    var conditions = { username: req.body['username']},
      update = { $set: { password: bcrypt.hashSync(req.body['password'] )}};
    User.updateOne(conditions,update,function(err,u){
      res.send("Updated");
    })
  }
});
router.delete('/user/:username',(req,res)=>{
  User.findOneAndDelete({username:req.params['username']},function(err,u){
    if(err)
      return res.send(err);
    if(u==null)
      return res.send("No such user");
    res.send("Deleted: " +u.username+"<br>\n");
  })
});
router.post('/location_csv', upload.single('file'), function (req, res, next){
  fs.rename(req.file.path, req.file.destination+req.file.originalname, function(err) {
    if ( err ) console.log('ERROR: ' + err);
    else{
      fs.readFile(req.file.destination+req.file.originalname, function (err, data) {
        if (err) throw err;
        var records=data.toString().split('\r\n');
        for (var index in records){
          if(index==0)
            continue;
          if(records[index].trim()=="")
            continue;
          var record=records[index].split(",");
          var location = new Location({
            pid: record[0],
            locationName: record[1],
            latitude: record[2],
            longitude: record[3],
            address: record[4],
            phone: record[5],
          });
          location.save(function(err) {
            if (err) {
              // console.log(err);
              console.log("Duplicate" + err.errors.pid.properties.value);
            };
          });
        }
      });
    }
  });
  res.send('Uploaded');

});
router.post('/fetch', (req,res)=>{
  // axios.get(`${PostAPI}/posts`).then(posts=>{
  //   console.log(posts.data);
  // });

  request({
    uri: PostAPI,
    method: "get",
    headers: {
      'Authorization': 'Bearer rWfYhuF03DIwz52KcoX7CTY2g_UHkC-bhSymzbMDNfs5CBmqyvtUcYbpGqlbe_CrpSqcWs-T8zbOoS4lo_NCVe-c-SICON9wNUCYxIbXjlS5PrE4-S9lHRMUfEC5XnYx'
    },
  }, function(error, response, body) {
    console.log('@@@@@@@@@@@@@@@@@@@');
    console.log(response);
      console.log('hihi'+body);
      var data=JSON.parse(body.replace(/"EN_NOTES_1":.*?"EN_NOTES_2".*?,"TC_URL/g,'"TC_URL')).businesses;
      var numOfItems=data.length;
      for(var index in data){
        var item = data[index];
        var pid=index;
        var locationName=item.name;
        var latitude=item.coordinates.latitude;
        var longitude=item.coordinates.longitude;
        var address=item.location.display_address.toString();
        var phone=item.phone;
        if (phone!=null){
          phone = phone.replace("+852", "");
        }

        var location = new Location({
          pid: pid,
          locationName: locationName,
          latitude: latitude,
          longitude: longitude,
          address: address,
          phone: phone,
        });
        location.save(function(err) {
          if (err) {
            console.log(err);
            console.log("Duplicate" + err.errors.pid.properties.value);
          }
          numOfItems--;
          // console.log("Remaining " + numOfItems);
          if(numOfItems==0) {
            res.status(201);
            res.send("success");
          }
        });

      }
  });
});

module.exports=router;
