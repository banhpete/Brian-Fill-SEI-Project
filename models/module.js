const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema(
  {
    topic: String,
    category: String,
    source: String,
    content: String,
    fibStats: [String],
    numFoundUseful: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Module", moduleSchema);
