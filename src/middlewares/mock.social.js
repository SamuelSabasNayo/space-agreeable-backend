import dotenv from 'dotenv';

dotenv.config();
export default (req, res, next) => {
  if (req.url.includes('/auth/facebook')) {
    res.redirect('/auth/mock');
  } else {
    next();
  }
};
export const facebookMock = (req, res, next) => {
  req.user = JSON.parse(process.env.FAKE_USER);
  next();
};
