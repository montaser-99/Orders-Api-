import Joi from 'joi';


let registervalidation=Joi.object({
    firstName:Joi.string().min(3).lowercase().trim().required(),
    lastName:Joi.string().min(3).lowercase().trim().required(),
    email:Joi.string().email().min(3).trim().lowercase().required(),
    password: Joi.string().min(8).max(20).trim().required(),
    role:Joi.string().trim()
})


let loginvalidation=Joi.object({
    email:Joi.string().email().min(3).trim().lowercase().required(),
     password: Joi.string().min(8).max(20).trim().required(),
})

export{
    registervalidation,loginvalidation
}