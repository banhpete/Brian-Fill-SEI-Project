const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userCompSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  score: String,
});

const moduleSchema = new Schema(
  {
    topic: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    source: String,
    content: String,
    guidedNotes: String,
    fibStats: [String],
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    userCompArr: [userCompSchema],
    usersFoundUseful: [Schema.Types.ObjectId],
    dateCreated: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Module", moduleSchema);
