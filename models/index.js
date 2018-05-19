// requirements
const mongoose = require("mongoose");

// db name
mongoose.connect("mongodb://localhost/yelp-camp");

// use promises
mongoose.Promise = Promise;

const models = {};

models.Campground = require("./campground");
models.Comment = require("./comment");
models.User = require("./user");

module.exports = models;