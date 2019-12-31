var mongoose= require("mongoose");
var campground = require("./models/campground")
var comment = require("./models/comment")
var data = [
			{
				Name: "Desert Mesa",
				image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoBkunyJxyhEPJ9tHLUOAf4Q4Rx70CUEnFR3HbBd0pyfSrPyZIUg&s",
				description: "Great time of year!"
			},
			{
				Name: "Desert Mesa Palace",
				image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoBkunyJxyhEPJ9tHLUOAf4Q4Rx70CUEnFR3HbBd0pyfSrPyZIUg&s",
				description: "Great time of year!"
			},
			{
				Name: "Desert Mesa BEACH",
				image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoBkunyJxyhEPJ9tHLUOAf4Q4Rx70CUEnFR3HbBd0pyfSrPyZIUg&s",
				description: "Great time of year!"
			}
		   ]
function seedDB(){
	//Remove all campgrounds
campground.remove({}, function(err){
	if(err){
		console.log(err)
	}
	console.log("removed campgrounds!");
})
	//Add Campground
	// data.forEach(function(seed){
	// 	campground.create(seed, function(err, campground){
	// 		if(err){
	// 			console.log(err)
	// 		} else {
	// 			console.log("added a campground!")
	// 			//Create comment
	// 			comment.create({
	// 				text: "It's Great",
	// 				author: "Love"
	// 			}, 
					
	// 			function(err, comment){
	// 			if(err){
	// 					console.log(err)
	// 				}else{
	// 					campground.comments.push(comment);
	// 					campground.save();
	// 					console.log("Created new comment ")
	// 				}
	// 			})
	// 		}
	// 	})
	// })
}

module.exports = seedDB;