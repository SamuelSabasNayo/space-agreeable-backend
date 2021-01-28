import express, { Router } from 'express';
import protection from '../middlewares/check-auth';
import {
  createRoom as _createRoom, getAllRooms, getRoomById, updateRoom as _updateRoom, deleteRoom as _deleteRoom, roomByHotel
} from '../controllers/room';

const app = express();

const router = Router();

// Rooms controllers

const createRoom = _createRoom;
const getRooms = getAllRooms;
const getRoom = getRoomById;
const updateRoom = _updateRoom;
const deleteRoom = _deleteRoom;
const getHotelRooms = roomByHotel;

// Rooms routes
router.post('/rooms', protection, createRoom);
router.get('/rooms', getRooms);
router.get('/rooms/:roomId', getRoom);
router.put('/rooms/:idroom', protection, updateRoom);
router.delete('/rooms/:roomId', protection, deleteRoom);
router.get('/rooms/hotels/:hotelId/rooms', getHotelRooms);

export default router;
