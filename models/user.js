const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: {type: Boolean, default: false}
},
{
  usePushEach: true 
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);