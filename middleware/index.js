// require models
const db = require("../models");

const middlewareObj = {};


middlewareObj.isLoggedIn = (req, res, next) => {
	// redirect to next
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "You must be logged in!");
	}
	// redirect to login
	res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	// check if logged in
	if (req.isAuthenticated()) {
		db.Campground.findById(req.params.id)
			.then(campground => {
				// check if id's match
				if (campground.author.id.equals(req.user._id) || req.user.isAdmin) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			})
			.catch(err => {
				console.log(err);
				req.flash("error", "Something went wrong. Please try again later!");
				res.redirect("back");
			})
	} else {
		req.flash("error", "You must be logged in!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
	// check if logged in
	if (req.isAuthenticated()) {
		db.Comment.findById(req.params.comment_id)
			.then(comment => {
				// check if id's match
				if (comment.author.id.equals(req.user._id) || req.user.isAdmin) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			})
			.catch(err => {
				console.log(err);
				req.flash("error", "Something went wrong. Please try again later!");
				res.redirect("back");
			})
	} else {
		req.flash("error", "You must be logged in!");
		res.redirect("back");
	}
}


module.exports = middlewareObj;