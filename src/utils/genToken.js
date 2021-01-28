import jwt from 'jsonwebtoken';

const generateToken = (data) => {
  const token = `JWT ${jwt.sign(data, process.env.JWT_KEY, { expiresIn: '10h' })}`;
  return token;
};
export default generateToken;
