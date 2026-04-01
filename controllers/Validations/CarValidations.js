const joi = require('joi')

const CarSchema = joi.object({
    name : joi.string().required(),
    basePrice : joi.number().required(),
    image : joi.string(),
    description : joi.string(),
    isAvailable : joi.boolean()
})

module.exports = {CarSchema}