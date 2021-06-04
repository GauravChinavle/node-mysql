const Joi = require('joi');

const schemas = { 
  
   ownerSchema : Joi.object().keys({ 
        name: Joi.string().regex(/^[a-zA-Z]+$/).required() ,
        mob_no: Joi.string().regex(/^\d{10}$/),
        email: Joi.string().email().lowercase()
      })
  
}; 
module.exports = schemas;