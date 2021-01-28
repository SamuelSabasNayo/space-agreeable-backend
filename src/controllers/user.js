import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../database/models';

dotenv.config();


export const signup = (req, res) => {
    
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'Email already registered',
        });
      }
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephone: req.body.telephone || '',
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender || '',
        origin: req.body.origin || '',
        profession: req.body.profession || '',
        age: req.body.age || 0,
        identification_type: req.body.identification_type || 'ID',
        identification_number: req.body.identification_number || '',
        user_image: req.file ? req.file.filename : ''
      })
        .then((user) => {
          const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_KEY, { expiresIn: '1h' });
          jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            console.log(err, data);
          });
          res.status(201).json({
            message: 'User registered',
            user_details: user,
            token: `JWT ${token}`
          });
        });
    })
    .catch((error) => res.status(400).json(error.message));
};

export const signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed. User not found.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_KEY, { expiresIn: '1h' });
          jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            console.log(err, data);
          });
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    })
    .catch((error) => res.status(400).json(error));
};

export const getAllUsers = async (req, res) => {

    const user = await User.findAll();
    if (user){
      return res.status(200).json({user});
    }else{
      res.status(500).json({message: 'Error'});
    }
        
}


export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (user) {
      return res.status(200).json({ user });
    }else{
      return res.status(404).json({message: 'No User with the specified'});
    }

  }catch(error){
    res.status(500).json({ message: 'Error'})
  }
 
}

export const updateUserById = async (req, res) => {
  
    const users = await User.findAll();
    for(let i=0; i < users.length; i++){
      if (users[i].email === req.body.email){
          return res.status(409).json({
             message: 'User update failed, a user with the specified email exist',
          });
      }
    }
    try {
      const id = req.params.id;
      const [user] = await User.update(req.body, {where: {id : id }});
      
      if(user){
        return res.status(200).json({ message: 'User updated successfully' });
      }else{
        return res.send({ message: `Cannot update User with id=${id}. User not found`});
      }
  
    }catch(error){
      return res.status(500).json({ message:'Error'});
    }

}


export const deleteUserById = async (req, res) => {
  
    try {
      const id = req.params.id;
      const user = await User.destroy({where: {id : id }});

      if(user){
        return res.status(200).json({ message: 'User deleted successfully!' });
      }else{
        return res.send({ message: `Cannot delete User with id=${id}. Maybe User was not found!`});
      }

    }catch(error){
      return res.status(500).json({ message: 'Error' });
    }
}