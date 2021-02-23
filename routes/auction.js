var express = require('express');
const { InsufficientStorage } = require('http-errors');
const db = require('../database');

var router = express.Router();

/* GET all acutions. */
router.get("/", (req, res, next) => {
  var sql = "select * from auctions"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      console.log(rows)
      var obj = JSON.stringify(rows);
      // res.json({ "message":"success", "data":rows})
      res.render('auctions', {title: "Auctions", data: obj})
  });
});

/* GET an acution. */
router.get("/:id", (req, res, next) => {
  var sql = "select * from auctions where auctionName = ?"
  var params = [req.params.id]
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
    errors.push("No user specified");
  }
  if (!req.body.auctionDescription){
    errors.push("No bid specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  var data = {
    auctionName: req.body.auctionName,
    auctionDescription: req.body.auctionDescription
  }
  var sql = 'insert into auctionss (auctionName, auctionDescription) values (?, ?)';
  var params = [data.auctionName, data.auctionDescription]
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
