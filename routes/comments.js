// requirements
const express = require("express");
// merge params, important
const router = express.Router({
  mergeParams: true
});

// middleware
const middleware = require("../middleware");

// routes functions in different dir
var helpers = require("../helpers/comments");


// ROUTES
// NEW   -   COMMENT form template
router.get("/new", middleware.isLoggedIn, helpers.newComment);

// CREATE   -   COMMENT POST route, add a new comment
router.post("/", middleware.isLoggedIn, helpers.createComment);

// EDIT comment, render the form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, helpers.editComment);

// UPDATE comment
router.put("/:comment_id", middleware.checkCommentOwnership, helpers.updateComment);

// DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, helpers.deleteComment);


module.exports = router;