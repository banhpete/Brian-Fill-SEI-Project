const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema(
  {
    topic: String,
    category: String,
    source: String,
    content: String,
    fibStats: [String],
    creator: String,
    creatorId: Schema.Types.ObjectId,
    creatorAvatar: String,
    numFoundUseful: { type: Number, default: 0 },
    dateCreated: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Module", moduleSchema);
