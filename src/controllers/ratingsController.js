/* eslint-disable no-underscore-dangle */
/* eslint-disable no-constant-condition */
import model from '../database/models';
import fService from '../services/facilityService';

const addRating = async (req, res) => {
  let resp = '';
  const facId = req.params.id;
  const { id } = req.userData;
  try {
    const facility = await fService.findFacilityById(facId);
    if (!facility) {
      resp = res.status(404).json({ message: res.__('Facility Not found!') });
    } else {
      req.body.facilityId = facId;
      req.body.userId = id;
      const rating = await model.rating.create(req.body);
      if (rating) resp = res.status(201).json({ message: res.__('rating created'), rating });
    }
  } catch (error) {
    return res.status(500).json({ message: res.__('Internal error') });
  }

  return resp;
};

const getRatings = async (req, res) => {
  let resp = '';
  const facId = req.params.id;
  try {
    const facility = await fService.findFacilityById(facId);
    const ratings = facility ? await model.rating.findAll({ where: { facilityId: facId } }) : false;
    if (!ratings) {
      resp = res.status(404).json({ message: res.__('Facility Not found!') });
    } else {
      resp = res.status(200).json({ success: true, ratings });
    }
  } catch (error) {
    resp = res.status(500).json({ message: res.__('Internal error') });
  }
  return resp;
};

module.exports = { addRating, getRatings };
