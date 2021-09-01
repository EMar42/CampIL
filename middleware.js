module.exports.isLoggedIn = (req, res, next) => {
<<<<<<< HEAD
    console.log("Got in");
    if (!req.isAuthenticated()) {
        //returning to the previous path
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Yfou must be signed in first!');
        return res.redirect('/login');
    }
    next(); f
=======
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
>>>>>>> 51da2a2211a7cb3b87370d7f326abeb6384e42af
}