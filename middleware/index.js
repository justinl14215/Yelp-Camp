var campground = require("../models/campground"),
	comment = require("../models/comment");
	

// All middleware

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
		if (req.isAuthenticated()){
			campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found")
				res.redirect("back")
			} else { 

				if(foundCampground.author.id.equals(req.user._id)){
				next();
				} else{
					req.flash("error", "Invalid Permission!")
					res.send("back")
				}
			}
		});
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
		if (req.isAuthenticated()){
			comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found")
				res.redirect("back")
			} else { 

				if(foundComment.author.id.equals(req.user._id)){
				next();
				} else{
					req.flash("error", "Invalid Permission!")
					res.redirect("back")
				}
			}
		});
	} else{
		req.flash("error", "Please Login First!")
		res.redirect("back")
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "Please Login First!")
    res.redirect("/login");
}


module.exports = middlewareObj;