var express = require("express");
var router = express.Router();
var Module = require("../models/module");
var User = require("../models/user");

router.get("/:id", isLoggedIn, function (req, res, next) {
  console.log("hi");
  const p1 = Module.find({
    userCompArr: { $elemMatch: { user: req.user.id } },
  });
  const p2 = Module.find({ creator: req.user.id });
  Promise.all([p1, p2])
    .then(function (results) {
      res.render("profile", {
        user: req.user,
        compModules: results[0],
        createdModules: results[1],
      });
    })
    .catch(function (err) {
      next();
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login/google");
}

module.exports = router;
