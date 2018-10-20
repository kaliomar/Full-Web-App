var mongoose = require("mongoose");

var memSchema = mongoose.Schema({
  name:String,
  age:String,
  price:String,
  gender:String,
  image:String,
  comment:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ],
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    username:String
  }
});

var Member = mongoose.model("Member",memSchema);

module.exports = Member;
