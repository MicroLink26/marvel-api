const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    // unique : true permet de s'assurer que 2 users ne peuvent pas avoir le même email
    unique: true,
    type: String,
  },
  account: {
    username: {
      required: true,
      type: String,
    },
  },
  newsletter: Boolean,
  token: String,
  hash: String,
  salt: String,
  favorites: {
    characters: [String],
    comics: [String],
  },
});

module.exports = User;
