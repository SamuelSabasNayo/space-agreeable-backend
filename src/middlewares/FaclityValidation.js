/* eslint-disable no-underscore-dangle */
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import roleService from '../services/role';

config();

const _schema = Joi.object().keys({
  location: Joi.string().required().max(70),
  address: Joi.string().required().max(70),
  images: Joi.string().max(100),
  roomNumber: Joi.number().optional(),
  roomDetails: Joi.string().optional()
});
let _response = '';

const _validateFacility = async (req, res, next) => {
  const error = (['POST', 'PUT', 'PATCH'].includes(req.method))
    ? Joi.validate(req.body, _schema).error
    : null;
  const loggedinUser = req.headers.authorization;
  const validUser = loggedinUser
    ? jwt.decode(loggedinUser.split(' ')[1], process.env.JWT_KEY, { expiresIn: '10h' })
    : false;
  if (error) {
    _response = res.status(422).json({ message: error.details[0].message });
  } else if (!loggedinUser) {
    _response = res.status(403).json({ message: 'Provide you credentials' });
  } else if (!validUser) {
    res.status(401).json({ message: 'Your not authorised!' });
  } else {
    req.user = validUser;
    return next();
  }
  return _response;
};

const _authorizeUser = async (req, res, next) => {
  const validUser = req.user;
  const { roleId } = validUser;
  if (roleId === null) _response = res.status(401).json({ message: 'You must be a travel admin' });
  const loggedinUserRole = await roleService.findRoleById(roleId);
  if (loggedinUserRole.name === 'TRAVEL_ADMIN') return next();
  return res.status(401).json({ message: 'You must be a travel admin' });
};

module.exports = { _validateFacility, _authorizeUser };
