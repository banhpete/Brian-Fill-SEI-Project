const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: String,
    modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
