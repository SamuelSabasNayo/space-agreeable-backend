import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import model from '../database/models';

dotenv.config();

const { User } = model;

const signup = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (user) {
        return res.status(409).send({
          message: 'Email already registered',
        });
      }
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephone: req.body.telephone || '',
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'Nomad',
        gender: req.body.gender || '',
        origin: req.body.origin || '',
        profession: req.body.profession || '',
        age: req.body.age || 0,
        identification_type: req.body.identification_type || 'ID',
        identification_number: req.body.identification_number || '',
        user_image: req.file ? req.file.filename : ''
      })
        .then((user) => {
          const token = sign(JSON.parse(JSON.stringify(user)), process.env.JWT_KEY, { expiresIn: '1h' });
          verify(token, process.env.JWT_KEY, (err, data) => {
            console.log(err, data);
          });
          res.status(201).json({
            message: 'User registered',
            user_details: user,
            token: `JWT ${token}`
          });
        });
    })
    .catch((error) => res.status(400).send(error.message));
};

const signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = sign(JSON.parse(JSON.stringify(user)), process.env.JWT_KEY, { expiresIn: '10000h' });
          // verify(token, process.env.JWT_KEY, (err, data) => {
          // // console.log(err, data);
          // });
          const { role } = user.dataValues;

          res.json({ success: true, message: `You are signed-in as a ${role}`, token: `JWT ${token}` });
        } else {
          res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    })
    .catch((error) => res.status(400).send(error));
};

export default { signup, signin };
