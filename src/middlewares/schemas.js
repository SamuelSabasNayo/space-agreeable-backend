// load Joi module
const Joi = require('joi');

// accepts name only as letters
const name = Joi.string().required();

const personDataSchema = Joi.object().keys({
    firstname: name,
    lastname: name,
    telephone: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[^a-zA-Z\d\s:]/, 'Your password must be non-alphanumeric characters.').min(8).required(),
    gender: Joi.string().valid(['Male', 'Female']),
    origin: Joi.string(),
    profession: Joi.string(),
    age: Joi.number().integer(),
    identification_type: Joi.string().valid('Passport', 'ID'),
    identification_number: Joi.string(),
    user_image: Joi.string()

});


// export the schemas
module.exports = {
    '/signup': personDataSchema
};