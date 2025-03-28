const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } 
    return res.redirect('/auth/google');
}

module.exports = {
    checkAuth
}