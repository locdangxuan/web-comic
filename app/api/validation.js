//<-------------------validation------------------------>
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(8).required(),
		email: Joi.string().min(8).required().email(),
		password: Joi.string().min(8).required(),
		date: Joi.date().format('YYYY-MM-DD').utc().required()
	});
	return schema.validate(data);
}

const loginValidation = (data) => {
	const  schema = Joi.object({
		username: Joi.string().min(8).required(),
		password: Joi.string().min(8).required()
	});
	return schema.validate(data);
}

const updateInfoValidation = (data) => {

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;