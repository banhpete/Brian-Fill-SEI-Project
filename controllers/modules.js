const Category = require("../models/category");
const Module = require("../models/module");
const User = require("../models/user");

module.exports = {
  createView,
  createModule,
  showAll,
  showUser,
  deleteModule,
  useModule,
  checkAnswers,
  editModuleView,
  editModule,
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
  "this",
  "were",
];

function createView(req, res, next) {
  res.render("create", { user: req.user });
}

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
    while (
      words[randWdIndex].length < 3 ||
      ignoredWords.includes(words[randWdIndex])
    ) {
      randWdIndex = Math.floor(Math.random() * words.length);
    }
    words[randWdIndex] = "(-" + words[randWdIndex] + "-)";
    sentences[randIndex] = words.join(" ");
    req.body.fibStats.push(words.join(" "));
  }
  req.body.guidedNotes = sentences.join(" ");

  const p1 = Category.findOne({ name: req.body.category });
  const p2 = User.findById(req.user.id);
  Promise.all([p1, p2])
    .then(function (results) {
      req.body.category = results[0]._id;
      req.body.creator = results[1]._id;
      Module.create(req.body, function (err, module) {
        if (err) next();
        res.redirect("/");
      });
    })
    .catch(function (err) {
      next();
    });
}

function showAll(req, res, next) {
  Module.find({})
    .limit(12)
    .populate("category")
    .populate("creator")
    .exec(function (err, modules) {
      res.render("index", { user: req.user, modules: modules });
    });
}

function showUser(req, res, next) {
  Module.find({ creator: req.user.id })
    .populate("category")
    .populate("creator")
    .limit(12)
    .exec(function (err, modules) {
      res.render("index", { user: req.user, modules: modules });
    });
}

function useModule(req, res, next) {
  Module.findById(req.params.id)
    .populate("category")
    .populate("creator")
    .exec(function (err, module) {
      if (err) next();
      res.render("module", { user: req.user, module: module, feedback: null });
    });
}

function deleteModule(req, res, next) {
  Module.findByIdAndRemove({ _id: req.params.id }).exec(function (err, module) {
    if (err) next();
    if (req.path.includes("all") || req.path.includes("user"))
      res.redirect("back");
    else res.redirect("/modules/all");
  });
}

function checkAnswers(req, res, next) {
  Module.findById(req.params.id)
    .populate("category")
    .populate("creator")
    .exec(function (err, module) {
      if (err) next();
      let feedback = [0];
      module.fibStats.forEach(function (sentence, index) {
        let answer = sentence.match(/\(-.+-\)/);
        answer[0] = answer[0].replace(/((\(-)+|(-\))+)/g, "");
        if (req.body[index] == answer[0]) {
          feedback[0]++;
          feedback.push({ answer: req.body[index], status: "correct" });
        } else {
          feedback.push({ answer: req.body[index], status: "wrong" });
        }
      });
      feedback[0] = feedback[0] + "/" + module.fibStats.length;
      console.log(req.user);
      if (req.user) {
        console.log("Inside the if");
        let index = module.userCompArr.findIndex(
          (obj) => obj.user == req.user.id
        );
        console.log(index);
        if (index != -1) {
          module.userCompArr.splice(index, 1, {
            user: req.user.id,
            score: feedback[0],
          });
        } else {
          module.userCompArr.push({
            user: req.user.id,
            score: feedback[0],
          });
        }
        module.save(function (err) {
          if (err) next();
          res.render("module", { user: req.user, module: module, feedback });
        });
      }
      res.render("module", { user: req.user, module: module, feedback });
    });
}

function editModuleView(req, res, next) {
  Module.findById(req.params.id, function (err, module) {
    res.render("edit", { user: req.user, module });
  });
}

function editModule(req, res, next) {
  const promise = Category.findOne({ name: req.body.category });
  Module.findById(req.params.id, function (err, module) {
    console.log(req.body.numOfBlanks);
    if (req.body.numOfBlanks != "No change") {
      console.log("WTF! It's running");
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
        while (
          words[randWdIndex].length < 3 ||
          ignoredWords.includes(words[randWdIndex])
        ) {
          randWdIndex = Math.floor(Math.random() * words.length);
        }
        words[randWdIndex] = "(-" + words[randWdIndex] + "-)";
        req.body.fibStats.push(words.join(" "));
      }
      module.fibStats = req.body.fibStats;
    }
    module.topic = req.body.topic;
    module.source = req.body.source;
    promise.then(function (category) {
      module.category = category._id;
      module.userCompArr = [];
      console.log(category);
      module.save(function (err) {
        console.log(module);
        console.log("saved!");
        if (err) next();
        res.redirect("/modules/" + module._id);
      });
    });
  });
}
