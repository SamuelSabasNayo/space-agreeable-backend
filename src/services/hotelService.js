/* eslint-disable require-jsdoc */
import models from '../database/models';

const { hotel } = models;

export default class hotelService {
  static async findHotelByName(hotelname) {
    const existingHotel = await hotel.findOne({ where: { hotelname } });

    if (existingHotel) return existingHotel;
  }
}
