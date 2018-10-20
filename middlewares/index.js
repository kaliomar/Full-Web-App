var Member  = require("../models/members"),
    Comment = require("../models/comments");

var middlewareObj = {};

middlewareObj.checkPostOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Member.findById(req.params.id, function(err, foundMem) {
      if (err || !foundMem) {
        req.flash("error","Something gone wrong");
        res.redirect("back")
      } else {
        if(foundMem.author.id.equals(req.user._id) || req.user.isAdmin){
          req.member = foundMem;
          next();
        }else{
          req.flash("error","You don't have the permission to do that");
          res.redirect("back")
        }
      }
    });
  }else{
    req.flash("error","You should sign in first");
    res.redirect("back")
  }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err || !foundComment){
        console.log(err);
        req.flash("error","Sorry, that comment does not exist!");
        res.redirect("back");
      }else{
        if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
          req.comment = foundComment;
          next();
        }else{
          req.flash("error","You don't have the permission to do that");
          res.redirect("back");
        }
      }
    });
  }else{
    req.flash("error","You should sign in first");
    res.redirect("/login");
  }
}

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error","You should sign in first");
  res.redirect("/login");
}


module.exports = middlewareObj;
