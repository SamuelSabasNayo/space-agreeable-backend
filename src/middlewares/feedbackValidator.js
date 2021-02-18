import Joi from 'joi';
const validateFeedback = (data) => {
    const feedbackSchema = Joi.object().keys({
      feedback_title: Joi.string().min(3).max(150).required(),
      feedback_content: Joi.string().min(3).required()
})
        const {error} = feedbackSchema.validate(data);
        if(error)
        return {error: true, errorMessage: error.details[0].message};
        return {error: false};
}
export default validateFeedback;