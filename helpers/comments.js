// requirements
const db = require("../models");

// find campground by id
// render the new comment form template, pass data
exports.newComment = (req, res) => {
   db.Campground.findById(req.params.id)
      .then(() => {
         res.render("comments/new", {
            campground: campground
         })
      })
      .catch(err => {
         console.log(err);
      })
}


exports.createComment = (req, res) => {
   // find campground
   db.Campground.findById(req.params.id)
      .then((campground) => {
         // create comment
         db.Comment.create(req.body.comment)
            .then(comment => {
               // add author to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               // save comment
               comment.save();
               // save comment in campground object
               campground.comments.push(comment);
               campground.save();

               req.flash("success", "You added a new comment!");
               // redirect to campground
               res.redirect("/campgrounds/" + campground._id);
            })
            .catch(err => {
               console.log(err);
            })
      })
      .catch(err => {
         // error check
         console.log(err);
         res.redirect("/campgrounds");
      })
}


exports.editComment = (req, res) => {
   // find comment
   db.Comment.findById(req.params.comment_id)
      .then((comment) => {
         // find campground
         db.Campground.findById(req.params.id)
            .then((campground) => {
               // render with data
               res.render("comments/edit", {
                  comment: comment,
                  campground: campground
               });
            })
            .catch(err => {
               res.redirect("back");
            })
      })
      .catch(() => {
         res.redirect("back");
      })
}


exports.updateComment = (req, res) => {
   db.Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
      .then(() => {
         req.flash("success", "Changes saved!");
         res.redirect("/campgrounds/" + req.params.id)
      })
      .catch(err => {
         res.redirect("back");
      })
}


exports.deleteComment = (req, res) => {
   db.Comment.findByIdAndRemove(req.params.comment_id)
      .then(() => {
         req.flash("success", "Comment was deleted.");
         res.redirect("/campgrounds/" + req.params.id);
      })
      .catch(err => {
         console.log(err);
         res.redirect("back");
      })
}


module.exports = exports;