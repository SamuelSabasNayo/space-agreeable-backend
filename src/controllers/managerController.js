// import JWT from 'jwt-decode';
import model from '../database/models';

const { request } = model;

// get all requests
const getAllRequests = async (req, res) => {
  try {
    const { role } = req.userData;

    if (role !== 'Manager') return res.status(400).json({ Error: 'Access denied.' });

    const allRequests = await request.findAll({});

    if (!allRequests) return res.status(400).json({ message: 'No request found.' });

    return res.status(200).json({ message: allRequests });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get one request
const getOneRequest = async (req, res) => {
  try {
    const { role } = req.userData;

    if (role !== 'Manager') return res.status(400).json({ Error: 'Access denied.' });

    const { id } = req.params;
    const existingRequest = await request.findOne({ where: { id } });

    if (!existingRequest) return res.status(400).json({ Error: 'Request does not exist.' });

    return res.status(200).json({ message: existingRequest });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update a request
const updateRequest = async (req, res) => {
  try {
    const { role } = req.userData;

    if (role !== 'Manager') return res.status(400).json({ Error: 'Access denied.' });

    const { id } = req.params;
    const existingRequest = await request.findOne({ where: { id } });

    if (!existingRequest) return res.status(400).json({ Error: 'Request does not exist.' });

    const readyRequest = await request.update(req.body, {
      where: { id }
    });

    if (!readyRequest) return res.status(400).json({ message: `Request not updated ${existingRequest}` });

    const updatedRequest = await request.findOne({ where: { id } });
    return res.status(200).json({ message: 'Request approved.', updatedRequest });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default {
  getAllRequests,
  getOneRequest,
  updateRequest
};
