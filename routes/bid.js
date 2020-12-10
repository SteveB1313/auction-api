var express = require('express');
const { InsufficientStorage } = require('http-errors');
const db = require('../database');

var router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  var sql = "select * from bids"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.user){
    errors.push("No user specified");
  }
  if (!req.body.bid){
    errors.push("No bid specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  var data = {
    user: req.body.user,
    bid: req.body.bid
  }
  var sql = 'insert into bids (user, bid) values (?, ?)';
  var params = [data.user, data.bid]
  db.run(sql, params, function(err, result) {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": data,
      "id" : this.lastID
    })
  });
})

module.exports = router;
