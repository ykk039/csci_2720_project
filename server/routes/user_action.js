var schemas = require('../db.js');
const express = require('express');
const router =express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

var Location = schemas.Location;
var User= schemas.User;
var Comment = schemas.Comment;


router.get('/locations',(req,res)=>{
  if(req.query.fetchindex!=undefined){
    var skipnum=(req.query.fetchindex-1)*20;
    Location
      .find()
      .sort({$natural:-1})
      .skip(skipnum)
      .limit(20)
      .exec(
        function(err, locations) {
          if (err)
            return res.send(err);
          res.send(locations);
        });
  }
  else{
    Location
      .find()
      .sort({$natural:-1})
      // .limit(20)
      .exec(
        function(err, locations) {
          if (err)
            return res.send(err);
          res.send(locations);
        });
  }
});

router.get('/favorites/:username',(req,res)=>{
  User
    .findOne({username:req.params["username"]})
    .select("favorites")
    .populate("favorites")
    .exec(function (err,favorites) {
      if(err)
        return res.send(err);
      res.send(favorites);
    })
});
router.put('/favorites',(req,res)=>{
  Location
    .findOne({pid:req.body['locationID']},
      function (err,location) {
        if(err)
          return res.send(err);
        User
          .findOne({username:req.body['username']})
          .select("favorites")
          .populate("favorites")
          .exec(function (err,user) {
            if(err)
              return res.send(err);
            var favorites = user.favorites.filter(function (favorite) { return favorite._id.toString() === location._id.toString(); });
            if(favorites.length===0){
              User
                .updateOne({username:req.body['username']},{$addToSet:{favorites:location._id}},function(err,user){
                  res.send("Added to Favorites!");
                });
            }else{
              User
                .updateOne({username:req.body['username']},{$pull:{favorites:location._id}},function(err,user){
                  res.send("Removed From Favorites!");
                });
            }
          })
      });
});
router.get('/search',(req,res)=>{
  res.send("Unavailable Now!");
});
router.get('/comments/:locationID',(req,res)=>{
  Comment
    .find()
    .populate({
      path:'location',
      match:{pid:req.params['locationID']}
    })
    .populate({
      path:'user',
      select: 'username'
    })
    .select({comment:1, user: 1})
    .exec(function(err, comments) {
      if (err)
        return res.send(err);
      comments = comments.filter(function(comment) {
        if(comment.location!=null&&comment.user!=null)
          return comment;
      });
      res.send(comments);
    });

});
router.post('/comments',(req,res)=>{
  Location
    .findOne({pid:req.body['locationID']},
      function (err,location) {
        if(err)
          return res.send(err);
        User
          .findOne({username:req.body['username']},
          function (err,user) {
            if(err)
              return res.send(err);
            var comment= new Comment({
              user:user._id,
              location:location._id,
              comment:req.body['comment']
            });
            comment.save(function(err) {
              if (err)
                return res.send(err);
              res.status(201);
              res.send("successfully added!");
            });
          });
      });
});
module.exports=router;
