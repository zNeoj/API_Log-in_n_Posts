const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();


// Google Strategy
// This strategy is used to authenticate users using their Google Account
// The clientID and clientSecret are obtained by creating a new project in Google Cloud Platform
// The callbackURL is the URL where the user is redirected after authenticating with Google
// The callback function is called when the user is authenticated
// The profile object contains the user's information
// The done function is called to return the user's profile

const strat = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {

        const email = profile.emails[0].value;
        if (!email.endsWith("@itmexicali.edu.mx"))
        {
            return done(null, false, 
                { message: 'Email no válido. Ingresa uno del dominio @itmexicali.edu.mx' });
        }

        // passport callback function
        prof = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.email,
            photo: profile.photos[0].value
        }

        console.log(prof); // debug
        done(null, prof);
    }
);
module.exports = strat;
