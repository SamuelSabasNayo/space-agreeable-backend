
import model from '../database/models';

// creating a room

const createRoom = async (req, res) => {
  try {
    const hotel = await model.hotel.findOne({
      where : {
        id: req.body.hotelId
      }
    })
    if(hotel){
      const room = await model.RoomModel.create(req.body);

      hotel.rooms.push(req.body.roomType + "," + " room id: " + room.id)
      await model.hotel.update({"rooms":hotel.rooms}, {
        where: { 
          id:hotel.hotelId
         }
      });
      if (room) {
        return res.status(200).json({ room });
      }
      
    }else{
      return res.json({message: "You attempt to assign a room to the hotel which does not exist ! Room not created."})
    }
    return res.status(200)

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
};

//Getting all rooms

const getAllRooms = async (req, res) => {
  try {
    const rooms = await model.RoomModel.findAll();
    return res.status(200).json({ rooms });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//Getting  a particular room by id

const getRoomById = async (req, res) => {
  try {
    const {roomId} = req.params;
    const room = await model.RoomModel.findOne({
      where: { id: roomId }
      
    });
    if (room) {
      return res.status(200).json({ room });
    }
    return res.status(404).json({meassage:'Room with the specified ID does not exists'});
  } catch (error) {

    return res.status(500).send(error.message);
  }
};

//Updating a particular room by Id

const updateRoom = async (req, res) => {
  try {
    const { idroom } = req.params;
    const [ updated ] = await model.RoomModel.update(req.body, {
      where: { id: idroom }
    });
    if (updated) {
      const updatedRoom = await model.RoomModel.findOne({ where: { id: idroom } });
      return res.status(200).json({ room: updatedRoom });
    }
    throw new Error('Room not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//Deleting a particular room by id

const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const Room = await model.RoomModel.findOne({
      where: {
        id: roomId
      }
    });
     if(Room){
       const hotelRoom = await model.hotel.findOne({
         where: {
           id: Room.hotelId
         }
       })
       if(hotelRoom){
         const index = hotelRoom.rooms.indexOf(Room.roomType + "," + " room id: " + roomId);
         if(index > -1){
          hotelRoom.rooms.splice(index, 1)
          await model.hotel.update({"rooms":hotelRoom.rooms},{
            where: {
              id: hotelRoom.id
            }
          })
         }
        }
      }

    const deleted = await model.RoomModel.destroy({
      where: { id: roomId }
    });
    if (deleted) {
      return res.status(200).json({message:"Room deleted successfully."});
    }
    throw new Error("Room not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const roomByHotel = async (req, res) => {
  try {
    const {hotelId} = req.params;
    const rooms = await model.RoomModel.findAll({
      where: { hotelId: hotelId }
    });
    if (rooms) {
      return res.status(200).json({ rooms });
    }
    return res.status(404).send("Hotel Not found");
  } catch (error) {

    return res.status(500).send(error.message);
  }
};

//Exporting functions

module.exports = {createRoom,getAllRooms,getRoomById,updateRoom,deleteRoom,roomByHotel} 
