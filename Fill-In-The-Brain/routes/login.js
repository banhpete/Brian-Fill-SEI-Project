const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("login");
});

router.get("google", function (req, res, next) {
  res.render("login");
});

module.exports = router;
