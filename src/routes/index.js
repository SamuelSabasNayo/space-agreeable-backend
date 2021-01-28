const express = require('express') ;
const app = express();
const protection = require('../middlewares/check-auth');

const { Router } = require('express');

const router = Router();

const controller = require('../controllers/room');

//Rooms controllers

const createRoom = controller.createRoom;
const getRooms = controller.getAllRooms;
const getRoom = controller.getRoomById;
const updateRoom = controller.updateRoom;
const deleteRoom = controller.deleteRoom;
const getHotelRooms = controller.roomByHotel;

//Rooms routes

router.post('/rooms',protection, createRoom);
router.get('/rooms', getRooms);
router.get('/rooms/:roomId',getRoom);
router.put('/rooms/:idroom',protection,  updateRoom);
router.delete('/rooms/:roomId',protection, deleteRoom);
router.get('/rooms/hotels/:hotelId/rooms', getHotelRooms);



module.exports = router;