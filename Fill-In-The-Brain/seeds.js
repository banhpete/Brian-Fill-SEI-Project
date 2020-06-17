// utility to initialize database
require("dotenv").config();
require("./config/database");
const Category = require("./models/category");
const data = require("./data");
// clear out all Categorys and performers to prevent dups
const p1 = Category.deleteMany({});
p1.then(function (results) {
  return Category.create(data.categorys);
}).then(function () {
  process.exit();
});
