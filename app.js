// Requiring packages
var express					= require("express"),
	bodyParser				= require("body-parser"),
	mongoose				= require("mongoose"),
	expressSession			= require("express-session"),
	passport				= require("passport"),
	localStrategy			= require("passport-local"),
	flash					= require("connect-flash");

// Requiring routes
var campgroundRoutes 		= require("./routes/campgrounds"),
	commentsRoutes 			= require("./routes/comments"),
	indexRoutes 			= require("./routes/index")

// Requiring models
var	User					= require("./models/user")
	seedDB					= require("./seed");


// Set up express
var app	= express();
// Set file extention default to .ejs
app.set("view engine", "ejs");
// Set Public directory
app.use(express.static(__dirname + "/public"));
// Set body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Connect mongoose
var host = "3.9.14.146";
mongoose.connect("mongodb://tomer:tomer@" + host + ":27017/yelp_camp?authSource=admin",
				 {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false
				});
// Set flash
app.use(flash());
// Passport configuration
app.use(expressSession({
	secret:				"Abra Kadabra",
	resave:				false,
	saveUninitialized:	false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Send currentUser var to all .ejs files
app.use(function(req, res, next){
	res.locals.currentUser	= req.user;
	res.locals.message		= {
						error: 		req.flash("error"),
						success:	req.flash("success"),
						info:		req.flash("info")
					};
	next();
});
// seedDB();	// Seed the DB

// Set routes files
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use(indexRoutes);

// Server listening
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("YelpCamp Server is Running");
});