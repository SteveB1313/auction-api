var express = require('express');
const { InsufficientStorage } = require('http-errors');
const db = require('../database');

var router = express.Router();

/* GET all bids. */
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

/* GET all for an auction. */
router.get("/:auctionName", (req, res, next) => {
  var sql = "select * from bids where auctionName = ?"
  var params = [req.params.auctionName]
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
  if (!req.body.auctionName){
    errors.push("No auction name specified");
  }
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
    auctionName: req.body.auctionName,
    user: req.body.user,
    bid: req.body.bid
  }
  var sql = 'insert into bids (auctionName, user, bid) values (?, ?, ?)';
  var params = [data.auctionName, data.user, data.bid]
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
