var express = require("express");
var router = express.Router();
var modulesCtrl = require("../controllers/modules");

router.get("/all", modulesCtrl.showAll);

router.get("/create", isLoggedIn, modulesCtrl.createView);

router.post("/create", isLoggedIn, modulesCtrl.createModule);

router.get("/user/:id", isLoggedIn, modulesCtrl.showUser);

router.get("/edit/:id", isLoggedIn, modulesCtrl.editModuleView);

router.post("/edit/:id", isLoggedIn, modulesCtrl.editModule);

router.post("/:id/check", modulesCtrl.checkAnswers);

router.get("/:id", modulesCtrl.useModule);

router.delete("/delete/:id", isLoggedIn, modulesCtrl.deleteModule);

module.exports = router;

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login/google");
}
