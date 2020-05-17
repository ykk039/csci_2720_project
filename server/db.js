

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://2720_stefan:stefan_2720@localhost/2720project', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;

// Upon connection failure
db.on('error', console.error.bind(console,'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
  console.log("Connection is open...");
});

var LocationSchema = mongoose.Schema({
  pid: { type: String, required: true, unique: true },
  locationName:{type:String, required:true},
  latitude:{type:Number,required:true},
  longitude:{type:Number,required:true},
  address:{type:String,required:true},
  phone:{type:String},
});

var UserSchema = mongoose.Schema({
  username: {type: String,required:true,unique: true},
  password:{type:String, required:true},
  admin:{type:Boolean,default:false},
  favorites:[{type:  mongoose.Schema.Types.ObjectId,ref:'Location'}]
});

var CommentSchema = mongoose.Schema({
  user:{type:  mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  location:{type:  mongoose.Schema.Types.ObjectId,ref:'Location',required:true},
  comment:{type: String, required:true}
});

LocationSchema.plugin(uniqueValidator);
UserSchema.plugin(uniqueValidator);
CommentSchema.plugin(uniqueValidator);
var Location = mongoose.model('Location', LocationSchema);
var User = mongoose.model('User', UserSchema);
var Comment = mongoose.model('Comment', CommentSchema);
module.exports ={
  Location:Location,
  User:User,
  Comment:Comment
};