 

var schemas = require('./server/db.js');
const express = require('express');
const path =require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var session = require('express-session');
const app = express()


const admin_action = require('./server/routes/admin_action');
const user_action = require('./server/routes/user_action');
var bcrypt = require('bcryptjs');
var User=schemas.User;

app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))

app.use(express.static(path.join(__dirname, 'dist/build.js')));

app.use('/admin', admin_action);
app.use('/user', user_action);



app.use(session({
  secret: 'csci2720',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:1200000 }
}));

app.post('/login',(req,res)=>{
  User
    .findOne({username:req.body['username']},function (err,user) {
      if(err)
        return res.send("Invalid username or password");
      if(user==null)
        return res.send("Invalid username or password")
      console.log("133",req.body['password']);
      console.log(user);
      if(bcrypt.compareSync(req.body['password'],user.password)){
        req.session.regenerate(function (err) {
          if(err)
            return res.send("genereate error");
          req.session.loginUser = user.username;
          req.session.auth=user.admin;
          // res.set({
          //   'Access-Control-Allow-Credentials':true,
          //   'Access-Control-Allow-Origin': "http://localhost:8080"
          //   });
          res.send("Correct");
        });
      }else{
        return res.send("Invalid username or password");
      }
    });
});
app.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    if(err){
      res.send("Logout Fail");
      return;
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});
app.get('/state',(req,res)=> {
  res.json({username:req.session.loginUser,auth:req.session.auth});
});
// Catch all the routes request and return it to the index
app.get('*', (req, res)=>{
  console.log("get * "+req.session.loginUser);
  if(!req.session.loginUser)
    return res.send("Please Login First");
  console.log(req.session.loginUser);
  res.sendFile(path.join(__dirname,'index.html'))
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res)=>{
  console.log(`Running on port ${port}`);
});
