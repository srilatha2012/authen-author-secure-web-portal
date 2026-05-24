const mongoose = require("mongoose");

//Define user schema 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  githubId: {
    type: String,
  },
});

//Create User model from userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;