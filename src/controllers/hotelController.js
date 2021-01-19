import model from '../database/models';

require('dotenv').config();

const createHotel = async (req, res) => {
  try {
    const hotel = await model.hotel.create(req.body);
    return res.status(201).json({
      hotel,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Getting all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await model.hotel.findAll();
    return res.status(200).json({ hotels });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// Deleting a particular hotel by id
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await model.hotel.destroy({
      where: { id }
    });
    if (deleted) {
      return res.status(200).json({ message: 'Hotel deleted successfully.' });
    }
    throw new Error('Hotel not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
  // Getting  a particular room by id
const getHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await model.hotel.findOne({
      where: { id }
    });
    if (hotel) {
      return res.status(200).json({ hotel });
    }
    return res.status(404).send('Hotel with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getHotelRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const rooms = await model.roommodel.findAll({
      where: { hotelId }
    });
    if (rooms) {
      return res.status(200).json({ rooms });
    }
    return res.status(404).send('There is an error !');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await model.hotel.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedHotel = await model.hotel.findOne({ where: { id } });
      return res.status(200).json({ hotel: updatedHotel });
    }
    throw new Error('Hotel not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
  // Exporting functions
module.exports = {
  createHotel, getAllHotels, deleteHotel, getHotel, getHotelRooms, updateHotel
};
