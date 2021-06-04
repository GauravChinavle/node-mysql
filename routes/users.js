var express = require('express');
var router = express.Router();
var con = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Api is working');
});




router.post('/add', function(req, res, next) {
  const data = req.body;
  const name=data.name;
  const mob_no=data.mob_no;
  const email=data.email;

  con.connect(function() {
    var sql = "INSERT INTO owner (name, mob_no,email) VALUES (?,?,?)";
    con.query(sql,[name,mob_no,email], function (err, result) {
      console.log("1 record inserted, ID: " + result.insertId);
    });
  });
  res.json("i think we inserted");
});


router.get('/get', function(req, res, next) {
  con.connect(function() {
    con.query("SELECT * FROM owner", function (err, result, fields) {
      res.json(result)
    });
  });
});

router.get('/delete', function(req, res, next) {
  const query = req.query;
  const name = query.name;
  console.log(name);
  con.connect(function() {
    con.query("DELETE FROM OWNER WHERE NAME = ?",[name], function (err, result, fields) {
      res.json(result)
    });
  });
});

router.post('/update', function(req, res, next) {
  const query = req.query;
  const name = query.name;
  const data = req.body;
  const email = data.email;
  console.log(name);
  con.connect(function() {
    con.query("UPDATE OWNER SET EMAIL = ? WHERE NAME = ?",[email,name], function (err, result, fields) {
      res.json(result)
    });
  });
});



module.exports = router;
