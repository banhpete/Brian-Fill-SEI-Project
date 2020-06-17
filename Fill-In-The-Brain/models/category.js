const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  modules: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("Category", categorySchema);
