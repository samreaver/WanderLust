if(process.env.NODE_ENV !== "production") {
   require("dotenv").config();

}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing= require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");


const dburl = process.env.ATLASDB_URL;

main().then(()  => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});
 async function main() {
    await mongoose.connect(dburl);
 }
 app.set("view engine", "ejs");
 app.set("views", path.join(__dirname, "views"));
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
   mongoUrl: dburl,
   crypto:{
      secret : process.env.SECRET,
   },
   touchAfter: 24 * 60 * 60, // 24 hours
});
store.on("error", function(e){
   console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
   secret: process.env.SECRET,
   resave : false,
   saveUninitialized: true,
   cookie:{
      expires: Date.now()+7* 24 * 60 * 60 * 1000, // 7 days
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, // prevents client-side JavaScript from accessing the cookie


   }
};

// app.get("/", (req,res) => {
//     res.send("Hi, I am root");
//  });


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


 
app.use((req, res, next) => {
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currentUser = req.user; // Make currentUser available in all templates
   next();
}); 

// app.get("/demouser",async (req, res) => {
//    const fakeUser = new User({
//       email: "student@gmail.com",
//       username: "student",
//    });
//    const newUser = await User.register(fakeUser, "student123" );
//    res.send("User created successfully! You can now login with username: student and password: student123");

// });


app.use("/", user);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);




 //
//  app.get("/testListening", async (req ,res) => {
//     let sampleListing = new Listing({
//         title: "My Villa",
//         description: " by the beach",
//         price: 1200,
//         location: "Goa",
//         country: "India"

//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
//  });

app.all("*", (req, res, next) => {
   next(new ExpressError(404, "Page Not Found"));
});


app.use((err, req, res, next) => {
    console.log("ERROR:", err); // <-- Add this
    let statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
    let message = err.message || "Something went wrong";
    res.status(statusCode).render("error.ejs", { statusCode, errorMessage: message });
    next();
});
app.listen(8080, () => {
   console.log("server is listening to port 8080");
});
