// always require mongoose in model
const mongoose = require("mongoose");

// database schema setup
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	cost: Number,
	createdAt: { type: Date, default: Date.now },
	// associate comment with campground
	// array of comment id's
	// reference to the comments
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
},
{
  usePushEach: true 
});

// make a model from schema, Campground is the name of our model, always singular form!
// return model
module.exports = mongoose.model("Campground", campgroundSchema);
