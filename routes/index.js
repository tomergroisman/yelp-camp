var express     = require("express"),
    User	    = require("../models/user"),
    passport    = require("passport"),
    User        = require("../models/user");


var router = express.Router();

// Landing page route
router.get("/", function(req, res){
	res.render("landing");
});

// ==============
// Auth Routes
//===============
// Registration form
router.get("/register", function(req, res){
	res.render("register");
});
// Registration logic
router.post("/register", function(req, res){
	var formData = req.body,
		newUser = new User({username: formData.username});
	User.register(newUser, formData.password, function(err, user){
		if (err){
			req.flash("error", err.message)
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Wellcome to YelpCamp " + user.username + "!");
			res.redirect("/campgrounds");
		});
	});
});

// Login form
router.get("/login", function(req, res){
	res.render("login");
});
// Login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "login"
	}
), function(req, res){});

// Logout
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You logged out");
	res.redirect("/campgrounds")
});

// Checks if a user is logged in the server
function isLoggedin(req, res, next){
	if (req.isAuthenticated())
		return next();
	res.redirect("/login")
}

// Export
module.exports = router;