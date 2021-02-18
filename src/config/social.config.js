export const VerifyCallback = async ($, _, profile, done) => done(null, profile);

const facebookConfig = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'emails', 'displayName', 'name', 'gender'],
};

export { facebookConfig };
