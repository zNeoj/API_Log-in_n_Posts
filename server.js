const express = require('express');
const passport = require('passport');
const session = require('express-session');
const authStrategy = require('./APIs/AuthStrategy');
const authRouter = require('./Routes/auth');
const { checkAuth } = require('./Middlewares/auth');
const app = express();

app.use(express.json());

app.use(session ({
    secret: 'aurorasecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 15 // 15 minutos
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(authStrategy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes

app.use('/auth', authRouter);

app.get('/profile', checkAuth, (req, res) => {
    res.status(200).json({
    message: 'User is authenticated',
    user: req.user
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});