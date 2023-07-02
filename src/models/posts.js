const { Schema, model } = require("mongoose");

const postsSchema = new Schema({
  id: String,
  username: String,
  avatar: String,
  thumbnail: String,
  email: String,
  role: Number,
  posts: Number,
  threads: Number,
  joined: Date,
  lastOnline: Date
});

const postsModel = model("Posts", postsSchema);

module.exports = postsModel;
