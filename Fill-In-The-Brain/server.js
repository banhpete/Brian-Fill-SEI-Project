//  Node Modules
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var session = require("express-session");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Config Files
require("dotenv").config();
require("./config/database");
require("./config/passport");

// Routers
var loginRouter = require("./routes/login");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// App to Export
var app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routers to other Middleware
app.use("/login", loginRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

// If HTTP Requests don't go to any router then catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
