const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  topic: String,
  source: String,
  content: String,
  fibStats: [String],
  numFoundUseful: Number,
});

module.exports = mongoose.model("Module", moduleSchema);
