import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebookConfig, VerifyCallback } from '../config/social.config';

dotenv.config();

passport.use(
  new FacebookStrategy(
    facebookConfig, VerifyCallback
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
