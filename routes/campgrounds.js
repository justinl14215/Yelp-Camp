var express = require("express"),
	router  = express.Router(),
	campground = require("../models/campground"),
	middleware = require("../middleware");
	


router.post("/", middleware.isLoggedIn, function(req, res){
	
//get a data form and add to campgrounds array
	var name= req.body.name
	var price= req.body.price;
	var image= req.body.image
	var desc= req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image:image, description:desc, author: author}
// Create a new campground and save to DB
	campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err)
		} else {
			console.log(newlyCreated)
			res.redirect("/campgrounds")
		}
	})

})




router.get("/", function(req, res){

	
	//Get all CG from DB
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
		}
	})
	
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new")

});
// Show Basline
router.get("/:id", function(req, res){
	//find the campground by id
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else {
			console.log(foundCampground)
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})	
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground})
			});
		});


//Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	
	campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} 
		else {
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
			res.redirect("back");
		} else{
			res.redirect("back");
		}
	})
})







module.exports = router;

	
	
	
	
	
	
	
	