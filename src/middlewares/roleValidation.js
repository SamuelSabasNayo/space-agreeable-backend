/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const createRoleValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().min(3),
    description: Joi.string().required().min(5)
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return next();
};

export const roleAssignValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    _roleId: Joi.string().required(),
    _userId: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return next();
};
export const roleUpdateValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3),
    description: Joi.string().min(5)
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  return next();
};
