var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/create", isLoggedIn, function (req, res, next) {
  res.render("modules/create", { user: req.user });
});

module.exports = router;

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login/google");
}
