var express = require("express"),
    router  = express.Router(),
    Member  = require("../models/members");
    middleware = require("../middlewares");

//Index Route
router.get('/', function(req, res) {
  Member.find({}, function(err, foundMem) {
    if (err) {
      console.log(err);
    } else {
      res.render("members/index", { member: foundMem });
    }
  });
});

// Add Route
router.get("/new",middleware.isLoggedIn, function(req, res) {
  res.render("members/new");
});

// Create Route
router.post('/',middleware.isLoggedIn, function(req, res) {
  var name = req.body.name,
      age = req.body.age,
      price = req.body.price,
      gender = req.body.gender,
      image = req.body.image,
      author = {
        id:req.user._id,
        username: req.user.username
      }
  Member.create({ name: name, price:price, age: age, gender: gender, image: image,author:author }, function(err, created) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success","Topic added successfully");
      res.redirect("/members");
    }
  });
});

// Show Route
router.get("/:id", function(req, res) {
  Member.findById(req.params.id).populate("comment").exec(function(err, foundMem) {
    if (err || !foundMem) {
      console.log(err);
      req.flash("error","Sorry, that topic does not exist");
      return res.redirect("/members");
    } else {
      res.render("members/show", { member: foundMem });
    }
  });
});

// Edit Route
router.get("/:id/edit",middleware.checkPostOwnership, function(req, res) {
  Member.findById(req.params.id, function(err, foundMem) {
    res.render("members/edit", { member:foundMem });
  });
});

// Update Route
router.put("/:id",middleware.checkPostOwnership, function(req, res) {
  Member.findByIdAndUpdate(req.params.id, req.body.member, function(err, editted) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success","Topic editted successfully");
      res.redirect("/members/" + req.params.id);
    }
  });
});

// Destroy Route
router.delete("/:id",middleware.checkPostOwnership, function(req, res) {
  Member.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.redirect("/members");
    }
    req.flash("success","Topic deleted succesfully");
    res.redirect("/members");
  });
});



module.exports = router;
