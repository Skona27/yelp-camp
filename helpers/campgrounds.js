// requirements
const db = require("../models");


// get all campgrounds from db, find({}) to get all
// render the campground page and pass the campground data to the template
exports.getCampgrounds = (req, res) => {
   db.Campground.find()
      .then((campgrounds) => {
         res.render("campgrounds/index", {
            campgrounds: campgrounds,
            page: 'campgrounds'
         })
      })
      .catch((err) => {
         res.send(err)
      });
};


// get data from form
// create a new campground object
// add object to db, check if error occured
exports.createCampground = (req, res) => {
   let data = req.body;

   let {name, image, description, cost} = data;

   let author = {id: req.user._id, username: req.user.username};

   const newCampground = {name, image, description, cost, author};

   db.Campground.create(newCampground)
      .then(() => {
         req.flash("success", "You added a new campground!");
         res.redirect("/campgrounds")
      })
      .catch((err) => {
         console.log(err)
      });
}


// render the form template
exports.newCampground = (req, res) => {
   res.render("campgrounds/new");
}


// find the campground with provided ID
// req.params get the param from the url
// use populate.exec to put comments into comments collection
// render show template for that campground
// pass the found campground data to the template
exports.showCampground = (req, res) => {
   db.Campground.findById(req.params.id).populate("comments").exec()
      .then(campground => {
         res.render("campgrounds/show", {
            campground: campground
         });
      })
      .catch(err => {
         console.log(err);
         res.redirect("/campgrounds");
      });
}


// find the campground with provided ID
// render form with campground data
exports.editCampground = (req, res) => {
   db.Campground.findById(req.params.id)
      .then(campground => {
         res.render("campgrounds/edit", {
            campground: campground
         });
      })
      .catch(err => {
         console.log(err);
      });
}


// find campground and update
// redirect to showpage
exports.updateCampground = (req, res) => {
   db.Campground.findByIdAndUpdate(req.params.id, req.body.campground)
      .then(() => {
         req.flash("success", "Changes saved!");
         res.redirect("/campgrounds/" + req.params.id);
      })
      .catch(err => {
         console.log(err);
         res.redirect("/campgrounds");
      })
}


// find campground and delete
// redirect to showpage
exports.deleteCampground = (req, res) => {
   db.Campground.findByIdAndRemove(req.params.id)
      .then(() => {
         req.flash("success", "Campground was deleted.");
         res.redirect("/campgrounds");
      })
      .catch(err => {
         console.log(err);
         res.redirect("/campgrounds");
      })
}


module.exports = exports;