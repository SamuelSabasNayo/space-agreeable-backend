import model from '../database/models';

export default {
  findFacilityById: async (id) => {
  // eslint-disable-next-line no-underscore-dangle
    const _facility = await model.Facility.findOne({ where: { id } });
    if (_facility) return _facility;
  },
};
