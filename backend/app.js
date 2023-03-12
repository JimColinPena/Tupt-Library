require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const cors = require("cors")
const path = require('path')

const book = require('./routes/book');
const research = require('./routes/research');
const auth = require('./routes/auth');
const personnel = require('./routes/personnel');
const student = require('./routes/student');
const borrow = require('./routes/borrow');
const user = require('./routes/user');
const notification = require('./routes/notification');
const evaluation = require('./routes/evaluation');

app.use(express.json({ limit: '50mb' }));
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

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use('/api/v1', book);
app.use('/api/v1', research);
app.use('/api/v1', auth);
app.use('/api/v1', personnel);
app.use('/api/v1', student);
app.use('/api/v1', borrow);
app.use('/api/v1', user);
app.use('/api/v1', notification);
app.use('/api/v1', evaluation);

if (process.env.NODE_ENV !== 'PRODUCTION') 
    require('dotenv').config({ path: 'backend/config/config.env' })


    if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);
module.exports = app