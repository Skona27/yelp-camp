/*--- APP INIT ---*/
// express app requirements
const express = require("express"),
 	bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  expressSession = require("express-session"),
  methodOverride = require("method-override");

	// app init
 	app = express();

// express app settings, ejs template module and body-parser
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// set public directory
app.use(express.static(__dirname + "/public"));

// Method override
app.use(methodOverride("_method"));

// Mongo config and db models
const db = require("./models");

// flash messages
app.use(flash());

// date 
app.locals.moment = require('moment');

// Setup ROUTES
const commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// Setup passport auth
app.use(expressSession({
  secret: "My secret key!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// middleware, it will be called on every route
app.use((req, res, next) => {
  // inside locals, add user variable
  res.locals.user = req.user;
  // for flash messages
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  // go on with the code
  next();
});


/*--- ROUTES ---*/
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


/*--- SERVER INIT ---*/
app.listen(3000, () => {
	console.log("YelpCamp has started on port 3000");
});
