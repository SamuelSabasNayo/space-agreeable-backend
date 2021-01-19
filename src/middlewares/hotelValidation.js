/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const createHotelValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    hotelname: Joi.string().required(),
    pricerange: Joi.string().required(),
    location: Joi.string().required(),
    rooms: Joi.array().required(),
    images: Joi.array().required(),
    hotelemail: Joi.string().email().required(),
    ranking: Joi.string().allow(''),
    parking: Joi.string().allow(''),
    wifi: Joi.string().allow(''),
    swimmingpool: Joi.string().allow(''),
    breakfast: Joi.string().allow(''),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return next();
};

export const updateHotelValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    hotelname: Joi.string().min(5),
    pricerange: Joi.string().min(1),
    location: Joi.string().min(2),
    rooms: Joi.array().min(1),
    images: Joi.array().min(1),
    hotelemail: Joi.string().email(),
    ranking: Joi.string().min(1),
    parking: Joi.string().min(2),
    wifi: Joi.string().min(2),
    swimmingpool: Joi.string().min(2),
    breakfast: Joi.string().min(2),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return next();
};
