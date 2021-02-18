import Sequelize from 'sequelize';
import model from '../database/models';

const { Op } = Sequelize;

const returnQueries = (query) => {
  const queries = [];
  for (const key in query) {
    const value = query[key];

    if (key === 'requestStatus' || key === 'requesterName' || key === 'hotelName' || key === 'location' || key === 'roomType') queries.push({ [key]: { [Op.iLike]: `%${value}%` } });
    else queries.push({ [key]: value });
  }
  return queries;
};

export const searchRequest = async (req, res) => {
  try {
    const queries = returnQueries(req.query);
    const { id } = req.userData;
    const Request = await model.request.findAll({
      where: { idUser: id, [Op.and]: queries, },
      include: [
        {
          model: model.User,
          as: 'Requester',
        }
      ]
    });

    res.status(200).json({ Request });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const managerSearchRequestForRequester = async (req, res) => {
  try {
    const { id } = req.userData;
    const queries = returnQueries(req.query);

    const Request = await model.request.findAll({
      where: { [Op.and]: queries, },
      include: [
        {
          model: model.User,
          as: 'Requester',
        }
      ]
    });
    res.status(200).json({ Request: Request.filter((request) => (request.idUser !== id && request.Requester.managerId === id)) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
