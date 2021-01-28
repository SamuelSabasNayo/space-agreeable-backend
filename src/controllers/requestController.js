import model from '../database/models';
import { findRooms } from '../services/roomService';

// creating a request
const createRequest = async (req, res) => {
  try {
    const { idUser, idRoom, dateStart, dateEnd } = req.body,
      { id } = req.userData;
    const existingRoom = await findRooms(idRoom);

    if (!existingRoom) return res.status(400).json({ message: 'Room id does not exist' });
    // console.log(existingRoom);

    const newRequest = {
      idUser: req.userData.id,
      idRoom,
      dateStart,
      dateEnd
    };
    const request = await model.request.create(newRequest);

    // console.log(idUser);

    return res.status(201).json({ message: 'Request created successfully!', request});
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error!' });
  }
};

//updating a request
const updateRequest = async (req, res) => {
  try {
    const { idRequest } = req.params;
    const [ updated ] = await model.request.update(req.body, {
      where: { id: idRequest }
    });
    if (updated) {
      const updatedRequest = await model.request.findOne({ where: { id: idRequest } });
      return res.status(200).json({ request: updatedRequest });
    }
    throw new Error('Request not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//deleting a request
const deleteRequest = async (req, res) => {
  try {
    const { idRequest } = req.params;
    const deleted = await model.request.destroy({
      where: { id: idRequest }
    });
    if (deleted) {
      return res.status(200).json({ message: "Request deleted"});
    }
    throw new Error("Request id provided is not found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//getting all requests

const getAllRequests = async (req, res) => {
    const accommodation_requests = await model.request.findAll({});
    return res.status(200).json({ message: 'Requests found successfully!', accommodation_requests });
}

module.exports = {createRequest,updateRequest,deleteRequest,getAllRequests};
