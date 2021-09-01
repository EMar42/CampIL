module.exports.isLoggedIn = (req, res, next) => {
    console.log("Got in");
    if (!req.isAuthenticated()) {
        //returning to the previous path
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Yfou must be signed in first!');
        return res.redirect('/login');
    }
    next(); f
}