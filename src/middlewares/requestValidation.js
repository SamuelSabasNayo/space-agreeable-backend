/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const updateRequestValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    idRoom: Joi.number().integer().min(1),
    dateStart: Joi.date(),
    dateEnd: Joi.date().greater(Joi.ref('dateStart')),
    requestStatus: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED')
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return next();
};
