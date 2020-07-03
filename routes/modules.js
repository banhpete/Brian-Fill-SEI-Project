var express = require("express");
var router = express.Router();
var modulesCtrl = require("../controllers/modules");
const { body } = require("express-validator");

router.get("/all", modulesCtrl.showAll);

router.get("/search", modulesCtrl.searchModule);

router.get("/create", isLoggedIn, modulesCtrl.createView);

router.post(
  "/create",
  isLoggedIn,
  [
    body("content").escape(),
    body("topic").escape(),
    body("category").escape(),
    body("source").escape(),
  ],
  modulesCtrl.createModule
);

router.get("/useful/:uid/:mid", modulesCtrl.usefulModule);

router.get("/user/:id", isLoggedIn, modulesCtrl.showUser);

router.get("/edit/:id", isLoggedIn, modulesCtrl.editModuleView);

router.post(
  "/edit/:id",
  isLoggedIn,
  [
    body("content").escape(),
    body("topic").escape(),
    body("category").escape(),
    body("source").escape(),
  ],
  modulesCtrl.editModule
);

router.post(
  "/:id/check",
  [
    body("content").escape(),
    body("topic").escape(),
    body("category").escape(),
    body("source").escape(),
  ],
  modulesCtrl.checkAnswers
);

router.get("/:id", modulesCtrl.useModule);

router.delete("/delete/:id", isLoggedIn, modulesCtrl.deleteModule);

module.exports = router;

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login/google");
}
