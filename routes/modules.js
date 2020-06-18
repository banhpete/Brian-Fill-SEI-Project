var express = require("express");
var router = express.Router();
var modulesCtrl = require("../controllers/modules");

router.get("/all", modulesCtrl.showAll);

router.get("/create", isLoggedIn, function (req, res, next) {
  res.render("modules/create", { user: req.user });
});

router.post("/create", isLoggedIn, modulesCtrl.create);

router.get("/:id", isLoggedIn, modulesCtrl.showUser);

module.exports = router;

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login/google");
}
