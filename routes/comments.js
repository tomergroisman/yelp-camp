var express 	= require("express"),
	Comment		= require("../models/comment"),
	Campground	= require("../models/campground"),
	middleware		= require("../middleware");

// Set the router. mergeParams is used to get the params from the app.js route
var router = express.Router({mergeParams: true});

// Create a new comment form route
router.get("/new", middleware.isLoggedin, function(req, res){
	var id = req.params.id;

	Campground.findById(id, function(err, campground){
		if (err) {
			req.flash("info", "An error occoured. Please try again");
			res.redirect("/campgrounds/:id");
		}
		else
			res.render("comments/new", {campground: campground});
	});
})

// Create a comment POST route
router.post("/", middleware.isLoggedin, function(req, res){
	// Find campground
	var id = req.params.id;
	Campground.findById(id, function(err, campground){
		if (err)
			console.log(err);
		else {
			// create new comment
			var newComment = {
				text: 			req.body.comment.text,
				author: {
					id: 		req.user._id,
					username: 	req.user.username
				}
			}
			Comment.create(newComment, function(err, comment){
				if (err){
					req.flash("info", "An error occoured. Please try again");
					res.redirect("back");
				} else {
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Your comment was added!");
					res.redirect("/campgrounds/" + id);
				}
			})
		}
	});
})

// Edit a comment form route
router.get("/:commentId/edit", middleware.checkCommentOwnership, function(req, res){
	var id			= req.params.id,
		commentId	= req.params.commentId;

	Comment.findById(commentId, function(err, comment){
		if (err) {
			req.flash("info", "An error occoured. Please try again");
			res.redirect("back");
		}
		else
			res.render("comments/edit", {campground_id: id, comment: comment});
	})
})

// Edit a comment PUT route
router.put("/:commentId/edit", middleware.checkCommentOwnership, function(req,res){
	var id 			=req.params.id;
		commentId	= req.params.commentId,
		comment		= req.body.comment;

	Comment.findByIdAndUpdate(commentId, comment,  function(err, comment){
		if (err) {
			req.flash("info", "An error occoured. Please try again");
			res.redirect("back");
		}
		else {
			req.flash("success", "Your comment was edited!");
			res.redirect("/campgrounds/" + id);
		}
	});
})

router.delete("/:commentId", middleware.checkCommentOwnership, function(req, res){
	var id 			=req.params.id;
		commentId	= req.params.commentId;

	Comment.findByIdAndRemove(commentId, function(err){
		if (err){
			req.flash("info", "An error occoured. Please try again");
			res.redirect("back");
		}
		else {
			req.flash("success", "Your comment was deleted!");
			res.redirect("/campgrounds/" + id);
		}
	})
});

// Export
module.exports = router;