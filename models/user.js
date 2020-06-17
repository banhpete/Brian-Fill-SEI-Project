const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    avatar: String,
    modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
    googleId: String,
    facebookId: String,
    fitbId: String,
    fitbPass: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
