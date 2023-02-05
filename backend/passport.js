const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const ErrorHandler = require('../utils/errorhand');
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const dotenv = require('dotenv');
const User = require("./models/user");

dotenv.config({ path: 'config/config.env' })

passport.use(new GoogleStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: "/api/v1/google/callback",
	scope: ["profile", "email"],
},
	function (accessToken, refreshToken, profile, cb) {

		const googleEmail = profile._json.email;
		const googlePassword = profile._json.family_name;
		User.findOne({
			'google.google_id': profile.id
		}, function (err, user) {
			if (err) {
				return cb(err);
			}
			if (!user) {
				user = new User({
					google: {
						google_id: profile.id,
						google_mail: googleEmail,
					},
					name: profile.displayName,
					email: googleEmail,
					password: googlePassword,
					avatar: { url: profile._json.picture }
				});

				user.save(function (err) {
					if (err) console.log(err);
					// console.log(profile, "Register Successful, 'Access Token: '", accessToken, 'Refresh Token: ', refreshToken);
					// return cb(err, user);
					return cb(err, user);

				});
			} else {

				// if (user.status == "deactivated") {
				// 	return cb(err);
				// } else {
					// console.log(profile, "Login Successful, 'Access Token: '", accessToken, 'Refresh Token: ', refreshToken);
					// sendToken(user, 200, res)z
					return cb(err, user);
					// return cb( err, user);
				// }

			}
		});

	}
));

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["access_token"];
	}

	return token;
};

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_SECRET,
		},
		(payload, done) => {
			User.findById(payload.sub, (err, user) => {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});