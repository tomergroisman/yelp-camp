var Comment         = require("../models/comment"),
    Campground      = require("../models/campground");

var middlewareObj   = new Object;

// Checks if a user is logged in the server
middlewareObj.isLoggedin = function(req, res, next){
	if (req.isAuthenticated())
		return next();
	req.flash("error", "You need to Login to do that");
	res.redirect("/login");
};

// Checks if there is a user logged in, if so checks if he ownes thr campground
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if (req.isAuthenticated()){
		var id = req.params.id;
		Campground.findById(id, function(err, campground){
			if (err) {
				req.flash("info", "An error occoured. Please try again");
				return res.redirect("back");
			}
			if (req.user._id.equals(campground.author.id))
				next();
			else {
				req.flash("error", "You don't have premission to do that action");
				res.redirect("back");
			};
		});
	} else {
		req.flash("error", "You need to Login to do that");
		res.redirect("back");
	}
};

// Checks if there is a user logged in, if so checks if he ownes thr comment
middlewareObj.checkCommentOwnership = function(req, res, next){
	if (req.isAuthenticated()){
		var id = req.params.commentId;
		Comment.findById(id, function(err, comment){
			if (err) {
				req.flash("info", "An error occoured. Please try again");
				return res.redirect("back");
			}
			if (req.user._id.equals(comment.author.id))
				next();
			else  {
				req.flash("error", "You don't have premission to do that action");
				res.redirect("back");
			}
		});
	} else {
		req.flash("error", "You need to Login to do that");
		res.redirect("back");
	}
};

module.exports = middlewareObj;