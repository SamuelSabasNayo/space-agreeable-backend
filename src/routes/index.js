const { Router } = require('express');
const protection = require('../middlewares/check-auth');

const router = Router();

const controller = require('../controllers/room');

// Rooms controllers
const getRoom = controller.getRoomById;
const { updateRoom, createRoom, deleteRoom } = controller;
const getHotelRooms = controller.roomByHotel;

// Rooms routes
router.post('/hotels/rooms', protection, createRoom);
router.get('/hotels/:hotelId/rooms/:roomId', getRoom);
router.put('/hotels/:hotelId/rooms/:idroom', protection, updateRoom);
router.delete('/hotels/:hotelId/rooms/:roomId', protection, deleteRoom);
router.get('/hotels/:hotelId/rooms', getHotelRooms);

module.exports = router;
