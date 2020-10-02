const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

const registerValidation = data => {
    const schema = Joi.object({
        name : Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

// async function hashPassword( data){

//     return new Promise( (resolve, reject) => {
//         resolve(bcrypt.genSalt(process.env.SALT).then(
//             salt => {
//                 return bcrypt.hash(data, salt);
//             })
//         );
//     }
// }



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
// module.exports.hashPassword = hashPassword;
