import model from '../database/models';
import generateToken from '../utils/genToken';

// eslint-disable-next-line import/prefer-default-export
export const facebookController = async (req, res) => {
  const userData = {
    firstname: req.user._json.first_name,
    lastname: req.user._json.last_name,
  };
  const [user, created] = await model.User.findOrCreate({
    where: { firstname: userData.firstname, lastname: userData.lastname }
  });
  const token = generateToken({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.roleId,
  });

  const status = created ? 201 : 200;
  res.status(status).json({ user, token });
};
