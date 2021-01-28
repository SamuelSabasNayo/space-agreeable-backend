/* eslint-disable no-underscore-dangle */
import models from '../database/models';

const { Reaction, Facility } = models;

export default {
  liked: async (req, res) => {
    const {
      facilityId
    } = req.body;

    // validate facility before reacting
    if (facilityId === undefined) return res.status(400).json({ message: res.__('FacilityId is required') });

    // check if facility exists
    const facilityIdExist = await Facility.findOne({ where: { id: facilityId } });
    if (!facilityIdExist) return res.status(404).json({ message: res.__('No facility found') });

    // check if user reacted yet
    const _reacted = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId: req.body.facilityId
      }
    });

    // check if user liked the facility
    const _liked = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId,
        liked: true,
        unliked: false
      }
    });

    // check if user unliked the facility
    const _unliked = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId,
        liked: false,
        unliked: true
      }
    });

    // check if user undo the reaction
    const _undoReaction = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId,
        liked: false,
        unliked: false
      }
    });
    // check reaction status
    if (_reacted) {
      if (_unliked) {
        const _undo = await _reacted.update({
          liked: true,
          unliked: false
        });
        const totalLikes = await Reaction.findAndCountAll({
          where: {
            liked: true,
            facilityId
          }
        });
        const totalUnlikes = await Reaction.findAndCountAll({
          where: {
            unliked: true,
            facilityId
          }
        });
        return res.status(200).json({
          message: res.__('Facility liked'),
          liked: totalLikes.count,
          unliked: totalUnlikes.count,
          data: _undo.dataValues
        });
      }
      if (_liked) {
        const _undo = await _reacted.update({ liked: false });
        const totalLikes = await Reaction.findAndCountAll({
          where: {
            liked: true,
            facilityId,
          }
        });
        const totalUnlikes = await Reaction.findAndCountAll({
          where: {
            unliked: true,
            facilityId
          }
        });
        return res.status(200).json({
          message: res.__('Reaction undone'),
          liked: totalLikes.count,
          unliked: totalUnlikes.count,
          data: _undo.dataValues
        });
      }
      if (_undoReaction) {
        const _undo = await _reacted.update({ liked: true });
        const totalLikes = await Reaction.findAndCountAll({
          where: {
            liked: true,
            facilityId
          }
        });
        const totalUnlikes = await Reaction.findAndCountAll({
          where: {
            unliked: true,
            facilityId
          }
        });
        return res.status(200).json({
          message: res.__('Facility re-liked'),
          liked: totalLikes.count,
          unliked: totalUnlikes.count,
          data: _undo.dataValues
        });
      }
    }
    if (!_reacted) {
      const newReaction = await Reaction.create({
        facilityId,
        userId: req.userData.id,
        liked: true,
        unliked: false
      });
      const totalLikes = await Reaction.findAndCountAll({
        where: {
          liked: true,
          facilityId
        }
      });
      const totalUnlikes = await Reaction.findAndCountAll({
        where: {
          unliked: true,
          facilityId
        }
      });
      return res.status(201).json({
        message: res.__('Facility liked successfully'),
        liked: totalLikes.count,
        unliked: totalUnlikes.count,
        data: newReaction.dataValues
      });
    }
  },
  unliked: async (req, res) => {
    const {
      facilityId
    } = req.body;

    // validate facility before reacting
    if (facilityId === undefined) return res.status(400).json({ message: res.__('FacilityId is required') });

    // check if facility exists
    const facilityIdExist = await Facility.findOne({ where: { id: facilityId } });
    if (!facilityIdExist) return res.status(404).json({ message: res.__('No facility found') });

    // check if user reacted yet
    const _reacted = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId: req.body.facilityId
      }
    });

    // check if user liked the facility
    const _liked = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId,
        liked: true,
        unliked: false
      }
    });

    // check if user unliked the facility
    const _unliked = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId,
        liked: false,
        unliked: true
      }
    });

    // check if user undo the reaction
    const _undoReaction = await Reaction.findOne({
      where: {
        userId: req.userData.id,
        facilityId,
        liked: false,
        unliked: false
      }
    });
    // check reaction status
    if (_reacted) {
      if (_liked) {
        const _undo = await _reacted.update({
          liked: false,
          unliked: true
        });
        const totalLikes = await Reaction.findAndCountAll({
          where: {
            liked: true,
            facilityId
          }
        });
        const totalUnlikes = await Reaction.findAndCountAll({
          where: {
            unliked: true,
            facilityId
          }
        });
        return res.status(200).json({
          message: res.__('Facility unliked'),
          liked: totalLikes.count,
          unliked: totalUnlikes.count,
          data: _undo.dataValues
        });
      }
      if (_unliked) {
        const _undo = await _reacted.update({ unliked: false });
        const totalLikes = await Reaction.findAndCountAll({
          where: {
            liked: true,
            facilityId,
          }
        });
        const totalUnlikes = await Reaction.findAndCountAll({
          where: {
            unliked: true,
            facilityId
          }
        });
        return res.status(200).json({
          message: res.__('Reaction undone'),
          liked: totalLikes.count,
          unliked: totalUnlikes.count,
          data: _undo.dataValues
        });
      }
      if (_undoReaction) {
        const _undo = await _reacted.update({ unliked: true });
        const totalLikes = await Reaction.findAndCountAll({
          where: {
            liked: true,
            facilityId
          }
        });
        const totalUnlikes = await Reaction.findAndCountAll({
          where: {
            unliked: true,
            facilityId
          }
        });
        return res.status(200).json({
          message: res.__('Facility re-unliked'),
          liked: totalLikes.count,
          unliked: totalUnlikes.count,
          data: _undo.dataValues
        });
      }
    }
    if (!_reacted) {
      const newReaction = await Reaction.create({
        facilityId,
        userId: req.userData.id,
        liked: false,
        unliked: true
      });
      const totalLikes = await Reaction.findAndCountAll({
        where: {
          liked: true,
          facilityId
        }
      });
      const totalUnlikes = await Reaction.findAndCountAll({
        where: {
          unliked: true,
          facilityId
        }
      });
      return res.status(201).json({
        message: res.__('Facility unliked'),
        liked: totalLikes.count,
        unliked: totalUnlikes.count,
        data: newReaction.dataValues
      });
    }
  },
};
