var express     	= require("express"),
	methodOverride	= require("method-override")
	Campground		= require("../models/campground"),
	middleware		= require("../middleware");

var router = express.Router();
router.use(methodOverride("_method"));		// Set method-override

// All campgrounds summery
router.get("/", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, campgrounds){
		if (err)
			console.log(err);
		else
			res.render("campgrounds/index", {campgrounds: campgrounds});
	});
});

// Create a new campground form route
router.get("/new", middleware.isLoggedin, function(req, res){
	res.render("campgrounds/new");
});

// Create a new campground POST route
router.post("/", middleware.isLoggedin, function(req, res){
	// Get data from form and add to the campgrounds array
	// Retrive data from every single input
	var name	= req.body.name,
		image	= req.body.image,
		desc	= req.body.description;
		price	= req.body.price;
	// Add new campground to the DB
	Campground.create({
		name: 			name,
		image: 			image,
		description: 	desc,
		author: 		{
			id:			req.user._id,
			username:	req.user.username
		},
		price:			price
	}, function(err, campground){
		if (err) {
			req.flash("info", "An error occoured. Please try again");
			res.redirect("back");
		} else {
			req.flash("success", "Your campground was added!");
			res.redirect("/campgrounds");
		}
	});
});

// Show campground info route
router.get("/:id", function(req, res){
	var id = req.params.id;
	Campground.findById(id).populate("comments").exec(function(err, campground){
		if (err)
			console.log(err);
		else
			// Render the "show" page
			res.render("campgrounds/show", {campground: campground});
	});
});

// Edit a campground form
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res){
		var id = req.params.id;
		Campground.findById(id, function(err, campground){
			if (err) {
				req.flash("info", "An error occoured. Please try again");
				return res.redirect("back");
			}
			res.render("campgrounds/edit", {campground: campground});
		});
});

// POST a campground form
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	var id = req.params.id;

	Campground.findByIdAndUpdate(id, req.body.campground, function(err, updatedCampground){
		if (err) {
			req.flash("info", "An error occoured. Please try again");
			res.redirect("/campground");
		} else {
			req.flash("success", "Your camground was edited!");
			res.redirect("/campgrounds/" + id);
		}
	});
});

// Delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	var id = req.params.id;

	Campground.findByIdAndRemove(id, function(err){
		if (err) {
			req.flash("info", "An error occoured. Please try again");
			return res.redirect("/campgrounds");
		}
		req.flash("success", "Your campground was deleted!");
		res.redirect("/campgrounds");
	});
});

// Export
module.exports = router;