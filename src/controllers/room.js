/* eslint-disable no-underscore-dangle */
import model from '../database/models';

// creating a room
const createRoom = async (req, res) => {
  try {
    const hotel = await model.hotel.findOne({
      where: {
        id: req.body.hotelId
      }
    });
    if (hotel) {
      const room = await model.RoomModel.create(req.body);
      if (room) {
        return res.status(200).json({ room });
      }
    } else {
      return res.status(400).json({ message: res.__('You attempt to assign a room to the hotel which does not exist ! Room not created.') });
    }
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: res.__('Internal server error!') });
  }
};

// Getting  a particular room by id
const getRoomById = async (req, res) => {
  try {
    const { roomId, hotelId } = req.params;
    const room = await model.RoomModel.findOne({
      where: { id: roomId, hotelId }

    });
    const hotel = await model.hotel.findOne({ where: { id: hotelId } });

    if (!hotel) res.status(404).json({ message: res.__('Hotel with the specified ID does not exists') });

    if (!room) res.status(404).json({ meassage: res.__('Room with the specified ID does not exists') });

    return res.status(200).json({ room });
  } catch (error) {
    return res.status(500).send({ message: res.__('Internal server error!') });
  }
};

// Updating a particular room by Id
const updateRoom = async (req, res) => {
  try {
    const { idroom, hotelId } = req.params;
    const roomToUpdate = await model.RoomModel.findOne({
      where: { id: idroom, hotelId }
    });
    if (!roomToUpdate) return res.status(404).json({ message: res.__('Room of the specified hotel was not found') });

    const updatedRoom = await roomToUpdate.update(req.body);

    return res.status(200).json({ message: res.__('Room updated successfuly'), updatedRoom });
  } catch (error) {
    return res.status(500).send({ message: res.__('Internal server error!') });
  }
};

// Deleting a particular room by id
const deleteRoom = async (req, res) => {
  try {
    const { roomId, hotelId } = req.params;

    const deleted = await model.RoomModel.destroy({
      where: { id: roomId, hotelId }
    });
    if (deleted) {
      return res.status(200).json({ message: res.__('Room deleted successfully.') });
    }
    return res.status(404).json({ message: res.__('Room of the specified hotel was not found') });
  } catch (error) {
    return res.status(500).send({ message: res.__('Internal server error!') });
  }
};

const roomByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const rooms = await model.RoomModel.findAll({
      where: { hotelId }
    });
    if (rooms) {
      return res.status(200).json({ rooms });
    }
    return res.status(404).send({ message: res.__('Hotel Not found') });
  } catch (error) {
    return res.status(500).send({ message: res.__('Internal server error!') });
  }
};

// Exporting functions

module.exports = {
  createRoom, getRoomById, updateRoom, deleteRoom, roomByHotel
};
