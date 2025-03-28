const router = require('express').Router();
const googleRouter = require('./auth/google');

router.use('/google', googleRouter);

router.get('/logout', (req, res) => {
    // 1. Passport limpia su autenticación
    req.logout((err) => {
        if (err) return next(err);
        
        // 2. express-session limpia su sesión
        req.session.destroy((err) => {
            if (err) return next(err);
            
            // 3. Tú limpias lo que enviaste al cliente
            res.clearCookie('connect.sid');
            
            console.log(`User ${req.user?.email} completely logged out. Must see "undefined".`);
            res.redirect('/');
        });
    });
});

module.exports = router;