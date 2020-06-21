const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/fitbDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

db = mongoose.connection;

db.on("connected", function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});
