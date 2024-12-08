const express = require("express");
const path = require("node:path");
const app = express();
const homeRoute = require("./routes/home.route");
const exercisesRoute = require("./routes/exercises.route");
const exerciseRoute = require("./routes/exercise.route");
const progressionsRoute = require("./routes/progressions.route");
const progressionRoute = require("./routes/progression.route");
const newExerciseRoute = require("./routes/newExercise.route");
const aboutRoute = require("./routes/about.route");
require("dotenv").config();

//  view stuff
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// so that the req.body fills with the data we are sending on the POST requests
app.use(express.urlencoded({ extended: false }));

app.use("/", homeRoute);
app.use("/exercises", exercisesRoute);
app.use("/exercise", exerciseRoute);
app.use("/progressions", progressionsRoute);
app.use("/progression", progressionRoute);
app.use("/newExercise", newExerciseRoute);
app.use("/about", aboutRoute);

// 404
app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
