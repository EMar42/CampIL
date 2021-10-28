const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground');
const Review = require('./models/review.js');

//check if the user is currently login with Passport.session
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//check if the current user is the author of a campground
module.exports.isAuthor = async(req, res, next ) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do NOT have permission to do this')
        return res.redirect(`/campgrounds`)
    }
    next();
}

//check if the current user is the author of a campground
module.exports.isReviewAuthor = async(req, res, next ) => {
    const {reviewId} = req.params
    const review = await Review.findById(id)
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do NOT have permission to do this')
        return res.redirect(`/campgrounds`)
    }
    next();
}


//check if the current user is the author of a review
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}