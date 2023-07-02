const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  model: String,
  make: String,
  thumbnail: String,
  threads: Number
});

const modelModel = mongoose.model("Model", ModelSchema);
module.exports = modelModel;
