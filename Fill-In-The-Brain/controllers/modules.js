const Category = require("../models/category");
const Module = require("../models/module");

module.exports = {
  create: createModule,
};

let ignoredWords = [
  "in",
  "a",
  "the",
  "as",
  "is",
  "it",
  "of",
  "that",
  "from",
  "well",
  "are",
  "can",
  "thus",
  "with",
  "to",
  "an",
  "and",
  "be",
  "where",
  "have",
  "also",
  "or",
  "why",
  "how",
  "what",
  "there",
];

function createModule(req, res, next) {
  // Create another key:value pair for the Schema
  req.body.fibStats = [];
  // To track which sentence has been used already
  let randoArr = [];
  // Get all sentences in content
  let sentences = req.body.content.replace(/(\r\n|\n|\r)/gm, " ");
  sentences = sentences.match(/\S.*?\."?(?=\s|$)/g);
  // Create fib statements
  for (i = 0; i < req.body.numOfBlanks; i++) {
    let randIndex = Math.floor(Math.random() * sentences.length);
    while (randoArr.includes(randIndex)) {
      randIndex = Math.floor(Math.random() * sentences.length);
    }
    randoArr.push(randIndex);
    let words = sentences[randIndex].split(" ");
    let randWdIndex = Math.floor(Math.random() * words.length);
    console.log("randoIndex: ", randWdIndex);
    console.log("word: ", words[randWdIndex]);
    while (
      words[randWdIndex].length < 3 ||
      ignoredWords.includes(words[randWdIndex])
    ) {
      randWdIndex = Math.floor(Math.random() * words.length);
    }
    words[randWdIndex] = "(-" + words[randWdIndex] + "-)";
    req.body.fibStats.push(words.join(" "));
  }
  console.log("finished editting data");
  Module.create(req.body, function (err, module) {
    if (err) next();
    console.log("Module Saved");
    console.log(module.category);
    Category.findOne({ name: module.category }, function (err, category) {
      if (err) next();
      console.log("Category Updated");
      console.log("category");
      category.modules.push(module._id);
      category.save(function () {
        res.send(module);
      });
    });
  });
}
