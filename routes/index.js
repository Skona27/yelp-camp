const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");

// ROOT route
router.get("/", (req, res) => {
  //render the landing page
  res.render("landing");
});

// AUTH
// show register form
router.get("/register", (req, res) => {
  res.render("register");
});

// handling registeration
router.post("/register", (req, res) => {
  const user = new User({
    username: req.body.username
  });

  // check if admin
  if(req.body.adminCode === "qwerty12345!") {
    user.isAdmin = true;
  }

  // register user, check error
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      return res.render("register", {
        error: err.message
      });
    } else {
      // if none, log user in and redirect
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "You signed up, welcome!");
        res.redirect("/campgrounds");
      });
    }
  });
});


// show login form
router.get("/login", (req, res) => {
  res.render("login", {
    page: 'login'
  });
});


// handle user login, use passport authenticate middleware
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), (req, res) => {});


// logout and redirect
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You logged out!");
  res.redirect("/campgrounds");
});


module.exports = router;