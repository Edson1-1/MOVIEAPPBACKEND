const { string } = require('@hapi/joi');
const Joi = require('@hapi/joi');


const fileValidation = data => {
    const schema = Joi.object({
        title : Joi.string().required(),
        description: Joi.string().required()
    });

    return schema.validate(data);
};

module.exports.fileValidation = fileValidation;