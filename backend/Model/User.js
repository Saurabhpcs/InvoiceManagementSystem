const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
  },
  { timestamps: true }
);

const User = mongoose.model("Userdetails", UserSchema);

module.exports = User;
