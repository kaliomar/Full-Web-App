var mongoose = require("mongoose");
var Member = require("./models/members");
var Comment = require("./models/comments");

var data = [
  {
    name:"dida",
    age:"20",
    gender:"male",
    image:"https://images.pexels.com/photos/936133/pexels-photo-936133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  },
  {
    name:"Bosy",
    age:"19",
    gender:"female",
    image:"https://images.pexels.com/photos/1019281/pexels-photo-1019281.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  }
];

function seedDB(){
  Member.deleteMany({},function(err){
    if(err){
      console.log(err);
    }
    console.log("all members removed");
    Comment.deleteMany({},function(err){
      if(err){
        console.log(err);
      }
      console.log("all comments removed");
      // data.forEach(function(seed){
      //   Member.create(seed,function(err,member){
      //     if(err){
      //       console.log(err);
      //     }else{
      //       console.log("new member added");
      //       Comment.create({
      //         text:"this is comment one",
      //         author:"Evan"
      //       },function(err,comment){
      //         if(err){
      //           console.log(err);
      //         }else{
      //           member.comment.push(comment);
      //           member.save();
      //           console.log("new comment added");
      //         }
      //       });
      //     }
      //   });
      // });
    });
  });
}

module.exports = seedDB;
