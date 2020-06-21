const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    avatar: String,
    googleId: String,
    facebookId: String,
    fitbId: String,
    fitbPass: String,
    modulesFoundUseful: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
