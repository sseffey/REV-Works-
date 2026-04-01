// cerete joi
const joi = require('joi')

const RegesterSchema = joi.object({
    name: joi.string().required(),
    email:joi.string().required().email(),
    password:joi.string().required().min(8).max(15),
    role:joi.string().required().valid('customer', 'staff', 'admin')
})

const loginSxhema = joi.object({
     email:joi.string().required().email(),
    password:joi.string().required().min(8).max(15),
})

module.exports = {RegesterSchema,loginSxhema}