const Joi = require('joi'); 

  
const middleware = (ownerSchema) => { 
  return (req, res, next) => { 
    const options = {
      name : "Gaurav", // include all errors
      mob_no: "8693842216", // ignore unknown props
      email: "work@work.com" // remove unknown props
  };
    const { error,value } = ownerSchema.validate(req.body,options); 
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
      const { details } = error; 
      const message = details.map(i => i.path).join(',')
      console.log("error", message); 
      res.status(422).json({ error: "Please check "+message }) 
    } 
  } 
} 
module.exports = middleware;