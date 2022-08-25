const mongoose = require("mongoose");

// création du model Signup pour l'authentification
const Signup = mongoose.model("Signup", {
  email: String,
  account: {
    username: String,
    avatar: Object,
  },
  newsletter: Boolean,
  token: String,
  hash: String,
  salt: String,
});

module.exports = Signup;
