import model from '../database/models';
import decodeToken from '../utils/decodeToken';
require('dotenv').config();
import validateProfile from '../middlewares/profileValidator';
import * as _ from 'lodash';

const udpateProfile = async(req,res) => {
const userId = req.params.userId;
const  loggedInUser = await decodeToken(req);
  let user;
  try{
    user = await model.User.findByPk(loggedInUser.id);
    if(!user)
      return res.status(404).json({success: false, message: res.__("User not found")});
    if(user.dataValues.id != userId)
     return res.status(401).json({success: false, message: res.__("Access denied. You can only update your profile")});
  }
  catch(e){
    return res.status(404).json({success: false, message: res.__("User not found")});
 }
  const currentUser = user.dataValues;
  const {error, errorMessage} = await validateProfile(req.body,res);
  if(error)
  return res.status(400).send({
    success: false,
    error: errorMessage
  });
  const payloads =  req.body;
  const capturedData = [];
  for(let prop in currentUser){
    if(payloads.hasOwnProperty(prop)){
      currentUser[prop] = payloads[prop].value;
      if(payloads[prop].save == true)
       capturedData.push(prop);
    }
    }
    currentUser.savedData = capturedData;  
     let isProfileUpdate;
     try{
      isProfileUpdate =  await updateProfile(userId, currentUser);
     }
     catch(e){
       throw e;
     }
     return res.status(200).json({
       success: true,
       message: res.__("Profile saved successfully"),
       profile: _.pick(currentUser,['id','firstname','lastname','telephone','email','gender','origin','profession','identification_type',
       'identification_number','user_image'])
     }) 
 }

const getUserProfile = async(req,res) => {
  const userId = req.params.userId;
  let profile = {};
  let profilePayloads; 
  try{
      profilePayloads = await model.User.findByPk(userId);
      if(!profilePayloads.dataValues)
       return res.status(404).json({success: false, message: res.__("Profile not found")});
      if(profilePayloads.dataValues.id != userId)
        return res.status(401).json({success: false, message: res.__("Access denied. You can only update your profile")});
    }
   catch(e){
    return res.status(404).json({success: false, message: res.__("Profile not found")});
   }
   for(let prop in profilePayloads.dataValues){
    let subObj = {};
    subObj['value'] = profilePayloads.dataValues[prop];
    profile[prop] = subObj;
    subObj['save'] = false;
    if(profilePayloads.dataValues.savedData){
      let savedDataIndex = profilePayloads.dataValues.savedData.indexOf(prop);
      if(savedDataIndex != -1){
         subObj['save'] = true;
      }
    }
  }
 return res.status(200).json(
    _.pick(profile,['id','firstname','lastname','telephone','email','role','gender','origin','profession','identification_type',
  'identification_number','user_image']));
}

const updateProfile = async(userId, payloads) => {
     try{
          await model.User.update(payloads, {
            where: {id: userId}
          });
          return true;
     }
     catch(e){
         return false;
        }
}
module.exports = { udpateProfile, getUserProfile};