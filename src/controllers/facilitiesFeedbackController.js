import model from '../database/models';
import decodeToken from '../utils/decodeToken';
import validateFeedback from '../middlewares/feedbackValidator';

exports.sendFacilityFeedback = async(req,res) => {
    const {error, errorMessage} = await validateFeedback(req.body);
    if(error) return res.status(400).json({message: res.__(errorMessage)})
    const currentUser = await decodeToken(req,res);
    const {facility,facilityNotFound} = await findFacilityById(req.params.facilityId);
    if(facilityNotFound == true)
      return res.status(404).json({success: false, message: res.__("Facility not found")});
     const newFeedback = {
      facilityId:req.params.facilityId, senderId:currentUser.id, 
      feedback_title: req.body.feedback_title, feedback_content: req.body.feedback_content, seen: false
    }
    let feedback;
    try{
        feedback = await  model.FacilitiesFeedback.create(newFeedback);
    }catch(e){
     return   res.status(500).json({sucess: false, message:res.___("Error")});
    }
    return res.status(201).json({
        success: true,
        message: res.__("Feedback sent successfully"),
        feedback,
        sender: currentUser,
        facility
    })
}

exports.getByFeedbackId = async(req,res) => {
    const {feedback,feedbackNotFound} = await findFeedbackById(req.params.feedbackId);
    if(feedbackNotFound)
      return res.status(404).json({
         success: false,
         message: res.__("Feedback not found")
      })
    const {user, userNotFound} = await findUserById(feedback.dataValues.senderId);
     if(userNotFound)
      return res.status(400).json({message: res.__("Feedback sender not found")})
     const {facility, notFound} = await findFacilityById(feedback.dataValues.facilityId);
     if(notFound)  return res.status(400).json({message: res.__("Facility  not found")})

     return res.status(200).json({
         success:true,
         feedback: {data: feedback,facility: facility.dataValues,sender: user.dataValues
       }
     })
}

exports.deleteFeedback = async(req,res) => {
    const currentUser = await decodeToken(req,res);
    const {feedback,feedbackNotFound} = await findFeedbackById(req.params.feedbackId);
    if(feedbackNotFound)
      return res.status(404).json({message: res.__("Feedback not found")})
    if(currentUser.id != feedback.dataValues.senderId && currentUser.roleId != 3 && currentUser.roleId != 1)
        return res.status(400).json({message:"Access denied!"})
        try{
          await model.FacilitiesFeedback.destroy({
            where: { id: req.params.feedbackId }
          });
      }
      catch(e){
          return res.status(500).send({message:"Error"})
      }
      return res.status(200).json({
          success: true,
          message: res.__("Feedback deleted"),
          feedback: feedback.dataValues
      })
}

exports.updateFeedbackStatus = async(req,res) => {
    const feedbackId = req.params.feedbackId;
    const currentUser = await decodeToken(req);
    if(currentUser.roleId != 3 && currentUser.roleId != 1)
    return res.status(401).json({message: res.__("Access denied!")});
    const {feedback,feedbackNotFound} = await findFeedbackById(feedbackId);
    if(feedbackNotFound)
    return res.status(404).json({message: res.__("Feedback not found")});
    if(feedback.dataValues.seen == false){
        markFeedbackSeen(res,feedbackId);
    }
    else{
        unMarkFeedbackSeen(res,feedbackId);
    }

}
const markFeedbackSeen = async (res,feedbackId) => {
    await model.FacilitiesFeedback.update({seen: true},{where: {
        id: feedbackId
    }});
    return res.status(200).json({message: res.__("Feedback marked as seen")})
}

const unMarkFeedbackSeen = async (res,feedbackId) => {
    await model.FacilitiesFeedback.update({seen: false},{where: {
        id: feedbackId
    }});
    return res.status(200).json({message: res.__("Feedback marked as not seen")})
}
exports.getFeedBacksByFacilityId = async(req,res) => {
    const facilityId = req.params.facilityId;
    const {facility, facilityNotFound} = await findFacilityById(facilityId);
      if(facilityNotFound)
        return res.status(404).json({
            success: false,
            message: res.__("Facility not found")
        })
     const feedbacks = await model.FacilitiesFeedback.findAll({where: {facilityId: facilityId}})
     return res.status(200).json({
         feedbacks
     })
}

const findFacilityById = async(facilityId) => {
    let facility;
    try{
        facility = await model.Facility.findByPk(facilityId);
        if(!facility)
            return {facilityNotFound: true}
        return {facility};
    }
    catch(e){
        return {facilityNotFound: true}
    }
}

const findFeedbackById = async(feedbackId) => {
    let feedback;
    try{
        feedback = await model.FacilitiesFeedback.findByPk(feedbackId);
        if(!feedback)
          return {feedbackNotFound: true}
        return {feedback}
    }
    catch(e){
        return {feedbackNotFound: true}
    }
}

const findUserById = async(userId) => {
    let user;
    try{
        user = await model.User.findByPk(userId);
        if(!user)
         return {userNotFound: true}
        return {user};
    }
    catch(e){
        return {userNotFound: true}
    }
}
