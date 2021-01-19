import models from '../database/models';

const { hotels } = models;

class HotelServices {
  
  static createHotel(newHotel) {
    return hotels.create(newHotel);
  }

  static findByProp(prop) {
    return hotels.findAll({
      where: prop,
    });
  }

  static findOneHote(prop) {
    return hotels.findOne({
      where: {
        id:1,
      },
      include:['hotelsCity']
    });
  }

  // static getUsers() {
  //   return users.findAll();
  // }

  // /**
  //  * Find a User in storage using login credentials.
  //  * @param {*} prop HTTP request
  //  * @returns {*} JSON data
  //  */
  // static findByEmail(prop) {
  //   return users.findOne({
  //     where: prop,
  //   });
  // }

  // static findById(modelId) {
  //   return users.findOne({
  //     where: { id: modelId },
  //   });
  // }
}

export default HotelServices;