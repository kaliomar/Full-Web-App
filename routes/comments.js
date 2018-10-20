var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Member  = require("../models/members"),
    Comment = require("../models/comments"),
    middleware = require("../middlewares");

// Add Route
router.get('/new',middleware.isLoggedIn, function(req, res){
  Member.findById(req.params.id, function(err, member){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {member: member});
    }
  });
});

// Create Route
router.post('/',middleware.isLoggedIn, function(req, res) {
  Member.findById(req.params.id, function(err, member) {
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          member.comment.push(comment);
          member.save();
          req.flash("success","Comment added successfully");
          res.redirect("/members/" + req.params.id);
        }
      });
    }
  });
});

// Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership ,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundComment){
    res.render("comments/edit",{member_id:req.params.id,comment:foundComment});
  });
});

// Update Route
router.put("/:comment_id", middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,edittedComment){
    if(err){
      console.log(err);
    }else{
      req.flash("success","Comment editted successfuly");
      res.redirect("/members/"+req.params.id);
    }
  });
});

// Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndDelete(req.params.comment_id,function(err){
    if(err){
      console.log(err);
    }else{
      req.flash("success","Comment editted successfuly");
      res.redirect("/members/"+req.params.id);
    }
  });
});



module.exports = router;
