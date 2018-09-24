let mongoose = require('mongoose');

//Message UserSchema

let messageSchema = mongoose.Schema({
  name:{
    type:String,
    required : true
  },
  title:{
    type: String,
    requried : true
  },
  message:{
    type:String,
    required : true
  }
});

let Message = module.exports = mongoose.model('Message',messageSchema);
