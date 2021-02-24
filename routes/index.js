var express = require('express');
var router = express.Router();
const db = require('../database');

/* GET home page. */
router.get("/", (req, res, next) => {
  var sql = "select * from auctions"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      //res.json({"message":"success", "data":rows })
      res.render('index', {'title':'Auctions', "data":rows })
    
    });
});

module.exports = router;
