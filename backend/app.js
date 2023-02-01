const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
// const dotenv = require('dotenv');
require("dotenv").config();
// const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

const book = require('./routes/book');
const research = require('./routes/research');
const article = require('./routes/article');
const auth = require('./routes/auth');
const personnel = require('./routes/personnel');
const student = require('./routes/student');
const borrow = require('./routes/borrow');
const user = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use(
	cookieSession({
		name: "session",
		keys: ["keySession"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );

app.use('/api/v1', book);
app.use('/api/v1', research);
app.use('/api/v1', article);
app.use('/api/v1', auth);
app.use('/api/v1', personnel);
app.use('/api/v1', student);
app.use('/api/v1', borrow);
app.use('/api/v1', user);

app.use(errorMiddleware);
module.exports = app