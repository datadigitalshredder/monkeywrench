const { Schema, model } = require("mongoose");

const threadsSchema = new Schema({
    id: String,
    title: String,
    model: String,
    user: String,
    created: Date,
    lastPost: String
});

const threadsModel = model("Threads", threadsSchema);

module.exports = threadsModel;