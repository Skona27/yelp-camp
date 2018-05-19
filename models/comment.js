// Require mongoDB
const mongoose = require("mongoose");
// Create comment schema
const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
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

// Create model from Schema
// return model
module.exports = mongoose.model("Comment", commentSchema);
