// requirements
const express = require("express");
const router = express.Router();

// middleware
const middleware = require("../middleware");

// routes functions in different dir
var helpers = require("../helpers/campgrounds");


// ROUTES
// INDEX   -   CAMPGROUND GET route, view all the campgrounds
router.get("/", helpers.getCampgrounds);

// CREATE   -   CAMPGROUND POST route, add a new campground
router.post("/", middleware.isLoggedIn, helpers.createCampground);

// NEW   -   CAMPGROUND form template
router.get("/new", middleware.isLoggedIn, helpers.newCampground);

// SHOW   -   CAMPGROUND showpage, more info about campground
router.get("/:id", helpers.showCampground);

// EDIT 	-		CAMPGROUND edit page
router.get("/:id/edit", middleware.checkCampgroundOwnership, helpers.editCampground);

// UPDATE		-		CAMPGROUND update
router.put("/:id", middleware.checkCampgroundOwnership, helpers.updateCampground);

// DESTROY 	-		CAMPGROUND DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, helpers.deleteCampground);


module.exports = router;