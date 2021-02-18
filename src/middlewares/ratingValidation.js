/* eslint-disable no-underscore-dangle */
import Joi from 'joi';
import { config } from 'dotenv';

config();

const validateRatingData = (req, res, next) => {
  const schema = Joi.object().keys({
    rating: Joi.number().required(),
  });

  const error = req.method === 'POST'
    ? Joi.validate(req.body, schema).error
    : null;
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateRatingData };
