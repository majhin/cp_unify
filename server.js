require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const db = require("./config/mongoose");

//session and auth
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 9000;

const flash = require("connect-flash");
const customWare = require("./config/middleware");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Setting the View Engine and views path
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layout.ejs");
app.use(expressLayouts);
//for the link tag to appear in head of layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));

//Mongo store is used to store the session cookie in the db
app.use(
	session({
		name: "cp_unified",
		//ToDo change secret in prod mode
		secret: process.env.SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URL,
			autoRemove: "disabled",
		}),
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

app.use("/", require("./routes/index_routes"));

app.listen(port, () => {
	console.log(`CP app listening on port ${port}`);
});
