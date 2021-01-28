import Joi from 'joi';
const validateProfile = (data,res) => {
    const profileSchema = Joi.object().keys({
        firstname: Joi.object({ 
            value: Joi.string().min(3).max(100).required(),
            save: Joi.boolean().required()
            }).allow(null),
        lastname: Joi.object({ 
            value: Joi.string().min(3).max(100).required(),
            save: Joi.boolean().required()
         }).allow(null),
        telephone: Joi.object({ 
            value: Joi.string().regex(/^-?(0|[0-9]\d*)?$/, 'a valid phone number.').min(10).max(12).required(),
            save: Joi.boolean().required()
         }).allow(null),
        gender: Joi.object({
            value: Joi.string().valid('Male', 'Female').required(),
            save: Joi.boolean().required()
        }).allow(null),
        origin: Joi.object({
            value: Joi.string().required(),
            save: Joi.boolean().required()
        }).allow(null),
        profession: Joi.object({
            value: Joi.string().required(),
            save: Joi.boolean().required()
            }).allow(null),
        age: Joi.object({
            value:Joi.number().required(),
            save: Joi.boolean().required()
        }).allow(null),
        identification_type: Joi.object({
            value: Joi.string().valid('Passport', 'ID').required(),
            save: Joi.boolean().required()
        }).allow(null),
        identification_number: Joi.object({
            value: Joi.string().required(),
            save: Joi.boolean().required()
        }).allow(null)
})
        const {error} = profileSchema.validate(data);
        if(error)
        return {error: true, errorMessage: error.details[0].message};
        return {error: false};
}
export default validateProfile;