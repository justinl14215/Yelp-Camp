var express = require("express"),
    app =express(),
    request = require("request"),
    bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	campground = require("./models/campground"),
	comment = require("./models/comment"),
	User = require("./models/user"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	seedDB = require("./seeds");
	
	
	
	
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index")
	
	
mongoose.connect("mongodb://localhost:27017/yelp_campv11", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useFindAndModify", false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//Seed the Db
//seedDB();

//Passport Configuration

app.use(require("express-session")({
	secret: "My back hurts!",
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");	
   next();
});

//Requring Routes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

app.listen(3000, function(req, res){
	console.log("It Works!")
})