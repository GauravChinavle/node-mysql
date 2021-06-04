var express = require('express');
var router = express.Router();
var con = require('../config');
const Joi = require('joi'); 
const middleware = require('../middleware');
const schemas = require('../schema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Api is working');
});




router.post('/add', function(req, res, next) {
  try{
    const { body } = req; 
  const ownerSchema = Joi.object().keys({ 
    name: Joi.string().regex(/^[a-zA-Z]$/).uppercase().required() ,
    mob_no: Joi.string().regex(/^\d{10}$/).required() ,
    email: Joi.string().email().lowercase().required()
  }); 
  const result = ownerSchema.validate(body); 

  const { value, error } = result; 
  console.log(value);
  const valid = error == null; 
  
  if (!valid) { 
    res.status(422).json({ 
      message: 'Invalid request', 
      data: body 
    }) 
  } else { 
    console.log(result);
    con.connect(function(err) {
      var sql = "INSERT INTO owner (name, mob_no,email) VALUES (?,?,?)";
      con.query(sql,[value.name,value.mob_no,value.email], function (err, result) {
        console.log("1 record inserted");
      });
    });
    res.json({ message: 'Resource created'}) 
  }

  }catch(e){
    con.end();
    console.log("erro occurred");
  }
  
});

router.get('/getByName', 
  middleware(schemas.ownerSchema, 'name'), 
  (req, res) => { console.log('/owners'); 
    const data = req.query;
    const name = data.name; 
    con.connect(function(){
      con.query("SELECT * FROM owner where name=?",[name], function (err, result, fields) {
        res.json(result)
      });
    });
   
});


router.get('/deleteByNumber',
middleware(schemas.ownerSchema, 'mob_no')
, function(req, res, next) {
  const query = req.query;
  const mob_no = query.mob_no;
  con.connect(function(err) {
    con.query("DELETE FROM OWNER WHERE MOB_NO = ?",[mob_no], function (err, result, fields) {
      res.json(result)
    });
  });
});

router.post('/update',
middleware(schemas.ownerSchema),
 function(req, res) {
  const query = req.query;
  const name = query.name;
  const data = req.body;
  const email = data.email;
  console.log(name);
  con.connect(function(err) {
    con.query("UPDATE OWNER SET EMAIL = ? WHERE NAME = ?",[email,name], function (err, result, fields) {
      res.json(result)
    });
  });
});



module.exports = router;
