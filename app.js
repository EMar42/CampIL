if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/CampIL";
const secret = process.env.SECRET || "thisshouldbeabettersecret";

const app = express();

mongoose
    .connect("mongodb://localhost:27017/CampIL", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`connection to database established`);
    })
    .catch((err) => {
        console.log(`db error ${err.message}`);
        process.exit(-1);
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

//      ***v3 usage for connect-mongo***
// const store = new MongoStore({
//     url: dbUrl,
//     secret: "thisshouldbeabettersecret!",
//     touchAfter: 24 * 3600, //lazy session update
// });

// store.on("error", function (e) {
//     console.log("SESSION STORE ERROR");
// });

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: dbUrl,
        dbName: "sessions-db",
        stringify: false,
    }),
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    mongoOptions: { useUnifiedTopology: true },
    cookie: {
        httpOnly: true,
        //secure : true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));
app.use(flash());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/*********/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/*********/",
];
const connectSrcUrls = ["https://*.tiles.mapbox.com", "https://api.mapbox.com", "https://events.mapbox.com", "https://res.cloudinary.com/*********/"];
const fontSrcUrls = ["https://res.cloudinary.com/*********/"];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/diuytoipw/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            mediaSrc: ["https://res.cloudinary.com/diuytoipw/s"],
            childSrc: ["blob:"],
        },
    })
);

app.use(
    helmet.crossOriginEmbedderPolicy({
        policy: "credentialless",
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!!";
    res.status(statusCode).render("error", { err });
});

<<<<<<< HEAD
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`{Serving on port :${port}`);
=======
<<<<<<< HEAD
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`{Serving on port :${port}`);
=======
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
>>>>>>> dev
>>>>>>> parent of 4c3f953 (Revert "fixing some stuff")
});

