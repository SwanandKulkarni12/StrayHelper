const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
});

const Subs = mongoose.model("Subs", userSchema);
module.exports = Subs;
