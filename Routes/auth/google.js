const router = require('express').Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('google', { 
      scope: ['profile', 'email'], 
      hostedDomain: 'itmexicali.edu.mx' 
  }));

router.get('/callback', 
    passport.authenticate('google', {
        failureRedirect: '/auth/google/error',
        session: true
    }),
    (req, res) => {
        res.json(
            {
                message: 'Login successful',
                user: req.user
            }
        );
    }
);

router.get('/error', (req, res) => {
    res.status(401).json({
        error: 'Login failed',
        message: 'Perhaps not logged in as ITM student'
    });
});

module.exports = router;