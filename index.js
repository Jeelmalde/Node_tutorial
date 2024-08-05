const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./auth");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
	console.log(
		`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
	);
	next(); // Move on to the next phase
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

const personRoutes = require("./routes/PersonRoutes");
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/MenuItemRoutes");
app.use("/menu", menuItemRoutes);

app.get("/", function (req, res) {
	res.send("Welcome to the Hotel");
});

app.listen(PORT, () => {
	console.log("listening on port 3000");
});
