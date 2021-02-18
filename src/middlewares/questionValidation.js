/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const createQuestionValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(4).required(),
    subject: Joi.string().min(5).required(),
    message: Joi.string().min(5).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Please enter all fields!' });

  return next();
};
