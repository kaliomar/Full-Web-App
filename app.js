var express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  methodOverride = require("method-override"),
	  mongoose = require("mongoose"),
	  flash = require("connect-flash"),
	  Member = require("./models/members"),
	  Comment = require("./models/comments"),
	  User = require("./models/users"),
	  passport = require("passport"),
	  localStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose");

var commentsRoutes = require("./routes/comments"),
		memberRoutes   = require("./routes/members"),
		indexRoutes    = require("./routes/index");

// mongoose.connect("mongodb://127.0.0.1/member", {useNewUrlParser:true});
mongoose.connect("", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(require("express-session")({
	secret:"secret",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.use("/", indexRoutes);
app.use("/members/:id/comments", commentsRoutes);
app.use("/members", memberRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("Start listenning ...");
});
