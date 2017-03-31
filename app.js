var express                 = require("express");
var mongoose                = require("mongoose");
var passport                = require("passport");
var bodyParser              = require("body-parser");
var User                    = require("./models/user");
var LocalStrategy           = require ("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//These two methods are responsible for reading the session, taking the data from the session
//that is encoded and decode it
//By adding passportLocalMongoose in user.js, we've added the serializing and deserializing methods authomatically
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============
//   ROUTES 
// ===============

app.get("/", function(req, res){
    res.render("home");
});


app.get("/secret", function(req, res){
    res.render("secret");

});


//Auth Routes
//Show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res){
       req.body.username
       req.body.password
       User.register(new User({username: req.body.username}), req.body.password, function(err, user){
           if(err){
               console.log(err);
               //if there's an error you return the register page
               return res.render('register');
           }
           passport.authenticate("local")(req, res, function(){
               res.redirect("/secret");
           });
       });
});
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("server started");  
});