var express = require("express"),
    router  = express.Router(),
    passport= require("passport"),
    User    = require("../models/users");

router.get('/', function(req, res) {
  res.render("members/landing");
});

// SHOW Signup Route
router.get('/register',function(req,res){
  res.render("./auth/register");
});

// Handling user Sign up
router.post('/register',function(req,res){
  User.register(new User({username:req.body.username}),req.body.password,function(err,user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success","Welcome to members site" + user.username);
      res.redirect("/members");
    });
  });
});

// Show Login Route
router.get('/login',function(req,res){
  res.render("./auth/login");
});

// Handling user Login
router.post('/login',passport.authenticate("local",{
  successRedirect: "/members",
  failureRedirect: "/login"
}),function(req,res){});

// Logout Route
router.get('/logout',function(req,res){
  req.logout();
  req.flash("success","Goodbye");
  res.redirect("/");
});

module.exports = router;
