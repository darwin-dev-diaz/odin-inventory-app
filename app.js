const express = require("express");
const path = require("node:path");
const app = express();

//  view stuff
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// so that the req.body fills with the data we are sending on the POST requests
app.use(express.urlencoded({ extended: false }));