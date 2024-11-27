const express = require("express");
const path = require("node:path");
const app = express();
const testRoute = require("./routes/test.route");
const homeRoute = require("./routes/home.route");
const exercisesRoute = require("./routes/exercises.route");
require("dotenv").config();

//  view stuff
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// so that the req.body fills with the data we are sending on the POST requests
app.use(express.urlencoded({ extended: false }));

app.use("/test", testRoute);
app.use("/", homeRoute);
app.use("/exercises", exercisesRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
